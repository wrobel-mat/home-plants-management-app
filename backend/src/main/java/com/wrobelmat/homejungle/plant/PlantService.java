package com.wrobelmat.homejungle.plant;

import com.wrobelmat.homejungle.exceptions.plant.PlantNotFoundException;
import com.wrobelmat.homejungle.plant.projections.AddPlantForm;
import com.wrobelmat.homejungle.plant_img.PlantImgService;
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

    public List<Plant> getAllUserPlants(String userEmail) {
        User user = userService.findByEmail(userEmail);
        return plantRepository.findAllByUser(user);
    }

    public Plant getUserPlant(String userEmail, String plantId) throws PlantNotFoundException {
        User user = userService.findByEmail(userEmail);
        return plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);
    }

    public Plant addUserPlant(AddPlantForm addPlantForm, MultipartFile plantImg, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Plant plant = addPlantForm.toPlant(user);
        Plant newPlant = plantRepository.save(plant);
        String plantImgUri = plantImgService.saveImage(plantImg, newPlant.getId());
        newPlant.setImgUri(plantImgUri);
        return plantRepository.save(newPlant);
    }

    @Transactional
    public void deleteUserPlant(String plantId, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);
        plantImgService.deleteImage(plant.getImgUri());
        plantRepository.deleteByIdAndUser(plantId, user);
    }

    public Plant updateUserPlant(String userEmail, Plant newPlant) {
        User user = userService.findByEmail(userEmail);
        newPlant.setUser(user);
        return plantRepository.save(newPlant);
    }

    public String updatePlantImg(MultipartFile plantImg, String plantId, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);

        plantImgService.deleteImage(plant.getImgUri());

        String newImgUri = plantImgService.saveImage(plantImg, plantId);
        plant.setImgUri(newImgUri);
        plantRepository.save(plant);
        return newImgUri;
    }

    public List<Plant> findAll() {
        return plantRepository.findAll();
    }

    public void submitPlantWatering(String plantId, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);
        Optional<PlantWatering> lastWatering = getLastEvent(plant.getPlantWateringEvents());
        if (lastWatering.isEmpty() || (isNotTodayEvent(lastWatering.get()))) {
            PlantWatering plantWatering = new PlantWatering(plant);
            plantWateringService.addPlantWatering(plantWatering);
        }
    }

    public void submitPlantReplant(String plantId, String userEmail, String note) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);
        Optional<PlantReplant> lastReplant = getLastEvent(plant.getPlantReplantEvents());
        if (lastReplant.isEmpty() || isNotTodayEvent(lastReplant.get())) {
            PlantReplant plantReplant = new PlantReplant(plant, note);
            plantReplantService.addPlantReplant(plantReplant);
        }
    }

    public void submitPlantFertilization(String plantId, String userEmail, String note) {
        User user = userService.findByEmail(userEmail);
        Plant plant = plantRepository
                .findByIdAndUser(plantId, user)
                .orElseThrow(PlantNotFoundException::new);
        Optional<PlantFertilization> lastFertilization = getLastEvent(plant.getPlantFertilizationEvents());
        if (lastFertilization.isEmpty() || isNotTodayEvent(lastFertilization.get())) {
            PlantFertilization plantFertilization = new PlantFertilization(plant, note);
            plantFertilizationService.addPlantFertilization(plantFertilization);
        }
    }

    private <T extends PlantTreatment> Optional<T> getLastEvent(List<T> eventList) {
        return eventList.stream().max((a, b) -> (int) (a.getEventDate() - b.getEventDate()));
    }

    private boolean isNotTodayEvent(PlantTreatment event) {
        Timestamp eventTimestamp = new Timestamp(event.getEventDate());
        return eventTimestamp.toLocalDateTime().getDayOfYear() != LocalDateTime.now().getDayOfYear();
    }

}
