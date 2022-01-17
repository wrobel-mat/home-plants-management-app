package com.wrobelmat.homejungle.plant;

import com.wrobelmat.homejungle.exception_handler.ExceptionHandlerProcessing;
import com.wrobelmat.homejungle.plant.projections.AddPlantForm;
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
    ResponseEntity<List<Plant>> getAllPlants(Authentication authentication) {
        List<Plant> userPlants = plantService.getAllUserPlants(authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Get All User Plants Successful")
                .body(userPlants);
    }

    @GetMapping("/{id}")
    ResponseEntity<Plant> getPlant(@PathVariable("id") String plantId,
                                   Authentication authentication) {
        Plant plant = plantService.getUserPlant(authentication.getName(), plantId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Get User Plant Successful")
                .body(plant);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<Plant> addPlant(@RequestPart("plant") @Valid AddPlantForm addPlantForm,
                                   @RequestPart(value = "plant_img", required = false) MultipartFile plantImg,
                                   Authentication authentication) {
        Plant newPlant = plantService.addUserPlant(addPlantForm, plantImg, authentication.getName());
        return ResponseEntity
                .created(URI.create("/" + newPlant.getId()))
                .header("message", "Add User Plant Successful")
                .body(newPlant);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deletePlant(@PathVariable("id") String plantId,
                                  Authentication authentication) {
        plantService.deleteUserPlant(plantId, authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Delete User Plant Successful")
                .build();
    }

    @PatchMapping("/{id}")
    ResponseEntity<?> updatePlant(@RequestBody @Valid Plant plant,
                                  @PathVariable("id") Long plantId,
                                  Authentication authentication) {
        Plant updatedPlant = plantService.updateUserPlant(authentication.getName(), plant);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Update User Plant Successful")
                .body(updatedPlant);
    }

    @PatchMapping(value = "/{id}", params = "img")
    ResponseEntity<?> updatePlantImage(@RequestPart("plant_img") MultipartFile plantImg,
                                       @PathVariable("id") String plantId,
                                       Authentication authentication) {
        String imgUri = plantService.updatePlantImg(plantImg, plantId, authentication.getName());
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
                .header("message", "Plant Transplant Successful")
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
