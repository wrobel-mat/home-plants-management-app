package com.wrobelmat.homejungle.plant;

import com.wrobelmat.homejungle.exceptions.plant.PlantNotFoundException;
import com.wrobelmat.homejungle.exceptions.plant_treatments.SubmitPlantTreatmentException;
import com.wrobelmat.homejungle.plant.projections.PlantWriteModel;
import com.wrobelmat.homejungle.plant.projections.PlantReadModel;
import com.wrobelmat.homejungle.plant_img.PlantImgDetails;
import com.wrobelmat.homejungle.plant_img.PlantImgService;
import com.wrobelmat.homejungle.plant_img.PlantImgType;
import com.wrobelmat.homejungle.plant_treatments.PlantTreatment;
import com.wrobelmat.homejungle.plant_treatments.plant_fertilization.PlantFertilization;
import com.wrobelmat.homejungle.plant_treatments.plant_fertilization.PlantFertilizationService;
import com.wrobelmat.homejungle.plant_treatments.plant_replant.PlantReplant;
import com.wrobelmat.homejungle.plant_treatments.plant_replant.PlantReplantService;
import com.wrobelmat.homejungle.plant_treatments.plant_watering.PlantWatering;
import com.wrobelmat.homejungle.plant_treatments.plant_watering.PlantWateringService;
import com.wrobelmat.homejungle.user.User;
import com.wrobelmat.homejungle.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlantService {

    private final PlantRepository plantRepository;
    private final UserService userService;
    private final PlantImgService plantImgService;
    private final PlantWateringService plantWateringService;
    private final PlantReplantService plantReplantService;
    private final PlantFertilizationService plantFertilizationService;

    public PlantService(PlantRepository plantRepository,
                        UserService userService,
                        PlantImgService plantImgService,
                        PlantWateringService plantWateringService,
                        PlantReplantService plantReplantService,
                        PlantFertilizationService plantFertilizationService) {
        this.plantRepository = plantRepository;
        this.userService = userService;
        this.plantImgService = plantImgService;
        this.plantWateringService = plantWateringService;
        this.plantReplantService = plantReplantService;
        this.plantFertilizationService = plantFertilizationService;
    }

    public List<PlantReadModel> getAllPlants(String userEmail) {
        User user = userService.findByEmail(userEmail);
        return plantRepository
                .findAllByUser(user)
                .stream()
                .map(this::getPlantReadModel)
                .collect(Collectors.toList());
    }

    public PlantReadModel getPlant(String userEmail, String plantId) throws PlantNotFoundException {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);
        return getPlantReadModel(plant);
    }

    public PlantReadModel addNewPlant(PlantWriteModel plantWriteModel, MultipartFile imgFile, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Plant persistedPlant = plantRepository.save(plantWriteModel.toPlant(user));
        PlantReadModel plantReadModel = new PlantReadModel(persistedPlant);

        if (imgFile != null && !imgFile.isEmpty()) {
            PlantImgDetails plantImgDetails = new PlantImgDetails(persistedPlant, PlantImgType.MAIN_IMG);
            String imgUri = plantImgService.saveImage(imgFile, plantImgDetails);
            plantReadModel.setMainImgUri(imgUri);
        }

        setLastPlantTreatments(persistedPlant, plantReadModel);

        return plantReadModel;
    }

    public PlantReadModel updatePlantDetails(PlantWriteModel plantWriteModel, String plantId, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Plant updatedPlant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);
        updatedPlant.setName(plantWriteModel.getName());
        updatedPlant.setSpecies(plantWriteModel.getSpecies());
        updatedPlant.setDescription(plantWriteModel.getDescription());
        updatedPlant.setLocation(plantWriteModel.getLocation());
        updatedPlant.setSoilType(plantWriteModel.getSoilType());
        updatedPlant.setTempRange(plantWriteModel.getTempRange());
        updatedPlant.setAirHumidity(plantWriteModel.getAirHumidity());
        updatedPlant.setSunlight(plantWriteModel.getSunlight());
        updatedPlant.setWatering(plantWriteModel.getWatering());
        updatedPlant.setFertilizeFreq(plantWriteModel.getFertilizeFreq());
        updatedPlant.setAirPurification(plantWriteModel.isAirPurification());
        updatedPlant.setToxicity(plantWriteModel.isToxicity());
        return getPlantReadModel(plantRepository.save(updatedPlant));
    }

    public String updatePlantMainImg(MultipartFile imgFile, String plantId, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);

        Optional<PlantImgDetails> oldPlantImgDetails = getPlantMainImgDetails(plant);
        oldPlantImgDetails.ifPresent(plantImgService::deleteImage);

        PlantImgDetails newPlantImgDetails = new PlantImgDetails(plant, PlantImgType.MAIN_IMG);

        return plantImgService.saveImage(imgFile, newPlantImgDetails);
    }

    @Transactional
    public void deletePlant(String plantId, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);
        plantImgService.deleteAllPlantImages(plant.getPlantImgDetailsList());
        plantRepository.deleteByIdAndUser(plantId, user);
    }

    public void submitPlantWatering(String plantId, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);

        Optional<PlantWatering> lastWatering = getLastEvent(plant.getPlantWateringTreatments());
        if (lastWatering.isPresent() && (isTodayEvent(lastWatering.get())))
            throw new SubmitPlantTreatmentException("Plant Already Watered Today");

        PlantWatering plantWatering = new PlantWatering(plant);
        plantWateringService.addPlantWatering(plantWatering);
    }

    public void submitPlantReplant(String plantId, String userEmail, String note) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);

        Optional<PlantReplant> lastReplant = getLastEvent(plant.getPlantReplantTreatments());
        if (lastReplant.isPresent() && isTodayEvent(lastReplant.get()))
            throw new SubmitPlantTreatmentException("Plant Already Replanted Today");

        PlantReplant plantReplant = new PlantReplant(plant, note);
        plantReplantService.addPlantReplant(plantReplant);

    }

    public void submitPlantFertilization(String plantId, String userEmail, String note) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);

        Optional<PlantFertilization> lastFertilization = getLastEvent(plant.getPlantFertilizationTreatments());
        if (lastFertilization.isPresent() && isTodayEvent(lastFertilization.get()))
            throw new SubmitPlantTreatmentException("Plant Already Fertilized Today");

        PlantFertilization plantFertilization = new PlantFertilization(plant, note);
        plantFertilizationService.addPlantFertilization(plantFertilization);
    }

    private PlantReadModel getPlantReadModel(Plant plant) {
        PlantReadModel plantReadModel = new PlantReadModel(plant);
        getPlantMainImgDetails(plant)
                .ifPresent(imgDetails ->
                        plantReadModel.setMainImgUri(plantImgService.getImgUri(imgDetails)));
        setLastPlantTreatments(plant, plantReadModel);
        return plantReadModel;
    }

    private Optional<PlantImgDetails> getPlantMainImgDetails(Plant plant) {
        return plant
                .getPlantImgDetailsList()
                .stream()
                .filter(plantImgDetails ->
                        plantImgDetails
                                .getImgType()
                                .equals(PlantImgType.MAIN_IMG.toString()))
                .findFirst();
    }

    private void setLastPlantTreatments(Plant plant, PlantReadModel plantReadModel) {
        Optional<PlantWatering> lastWatering = getLastEvent(plant.getPlantWateringTreatments());
        Optional<PlantReplant> lastReplant = getLastEvent(plant.getPlantReplantTreatments());
        Optional<PlantFertilization> lastFertilization = getLastEvent(plant.getPlantFertilizationTreatments());
        lastWatering.ifPresent(plantReadModel::setLastWatering);
        lastReplant.ifPresent(plantReadModel::setLastReplant);
        lastFertilization.ifPresent(plantReadModel::setLastFertilization);
    }

    private <T extends PlantTreatment> Optional<T> getLastEvent(List<T> eventList) {
        if (eventList == null) return Optional.empty();
        return eventList.stream().max((a, b) -> (int) (a.getEventDate() - b.getEventDate()));
    }

    private boolean isTodayEvent(PlantTreatment event) {
        Timestamp eventTimestamp = new Timestamp(event.getEventDate());
        return eventTimestamp.toLocalDateTime().getDayOfYear() == LocalDateTime.now().getDayOfYear();
    }

}
