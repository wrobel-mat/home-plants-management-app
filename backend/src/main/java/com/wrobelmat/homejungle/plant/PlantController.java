package com.wrobelmat.homejungle.plant;

import com.wrobelmat.homejungle.exception_handler.ExceptionHandlerProcessing;
import com.wrobelmat.homejungle.plant.projections.PlantWriteModel;
import com.wrobelmat.homejungle.plant.projections.PlantReadModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;


@ExceptionHandlerProcessing
@RestController
@RequestMapping("/plant")
public class PlantController {

    private final PlantService plantService;

    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping("/all")
    ResponseEntity<List<PlantReadModel>> getAllPlants(Authentication authentication) {
        List<PlantReadModel> plants = plantService.getAllPlants(authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Get All User Plants Successful")
                .body(plants);
    }

    @GetMapping("/{id}")
    ResponseEntity<PlantReadModel> getPlant(@PathVariable("id") String plantId,
                                   Authentication authentication) {
        PlantReadModel plant = plantService.getPlant(authentication.getName(), plantId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Get User Plant Successful")
                .body(plant);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<PlantReadModel> addPlant(@RequestPart("plant") @Valid PlantWriteModel plantWriteModel,
                                   @RequestPart(value = "plant_img", required = false) MultipartFile imgFile,
                                   Authentication authentication) {
        PlantReadModel newPlant = plantService.addNewPlant(plantWriteModel, imgFile, authentication.getName());
        return ResponseEntity
                .created(URI.create("/" + newPlant.getId()))
                .header("message", "Add User Plant Successful")
                .body(newPlant);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deletePlant(@PathVariable("id") String plantId,
                                  Authentication authentication) {
        plantService.deletePlant(plantId, authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Delete User Plant Successful")
                .build();
    }

    @PatchMapping("/{id}")
    ResponseEntity<PlantReadModel> updatePlantDetails(@RequestBody @Valid PlantWriteModel plantWriteModel,
                                                      @PathVariable("id") String plantId,
                                                      Authentication authentication) {
        PlantReadModel updatedPlant = plantService.updatePlantDetails(plantWriteModel, plantId, authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Update User Plant Successful")
                .body(updatedPlant);
    }

    @PatchMapping(value = "/{id}", params = "img")
    ResponseEntity<String> updatePlantMainImage(@RequestPart("plant_img") MultipartFile imgFile,
                                                @PathVariable("id") String plantId,
                                                Authentication authentication) {
        String imgUri = plantService.updatePlantMainImg(imgFile, plantId, authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Update Plant Image Successful")
                .body(imgUri);
    }

    @PostMapping(value = "/{id}", params = "watering")
    ResponseEntity<?> waterPlant(@PathVariable("id") String plantId, Authentication authentication) {
        plantService.submitPlantWatering(plantId, authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Plant Watering Successful")
                .build();
    }

    @PostMapping(value = "/{id}", params = "replant")
    ResponseEntity<?> replantPlant(@PathVariable("id") String plantId,
                                   Authentication authentication,
                                   @RequestBody(required = false) String note) {
        plantService.submitPlantReplant(plantId, authentication.getName(), note);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Plant Replant Successful")
                .build();
    }

    @PostMapping(value = "{id}", params = "fertilization")
    ResponseEntity<?> fertilizePlant(@PathVariable("id") String plantId,
                                     Authentication authentication,
                                     @RequestBody(required = false) String note) {
        plantService.submitPlantFertilization(plantId, authentication.getName(), note);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Plant Fertilization Successful")
                .build();
    }
}
