package com.wrobelmat.homejungle;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class Controller {

    @GetMapping
    public ResponseEntity<?> get() {
        String greeting = "hello from spring";
        return ResponseEntity.ok(greeting);
    }
}
