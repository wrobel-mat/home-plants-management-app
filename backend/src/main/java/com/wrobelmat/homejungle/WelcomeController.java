package com.wrobelmat.homejungle;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class WelcomeController {

    @GetMapping
    public ResponseEntity<?> get() {
        String greeting = "Welcome to the jungle!";
        return ResponseEntity.ok(greeting);
    }
}
