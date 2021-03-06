package com.wrobelmat.homejungle.user;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wrobelmat.homejungle.exception_handler.ExceptionHandlerProcessing;
import com.wrobelmat.homejungle.jwt.JwtUtil;
import com.wrobelmat.homejungle.user.projections.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static com.wrobelmat.homejungle.jwt.JwtUtil.ACCESS_TOKEN_EXPIRATION_MILLIS;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@ExceptionHandlerProcessing
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    ResponseEntity<UserReadModel> getUserDetails(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Get Me Successful")
                .body(new UserReadModel(user));
    }

    @PostMapping(value = "/register")
    ResponseEntity<UserReadModel> registerUser(@RequestBody @Valid UserRegisterModel userRegisterModel,
                                      @RequestParam(required = false, value = "lang") String lang) {
        User newUser = userService.registerUser(userRegisterModel, lang);
        URI location = URI.create("/" + newUser.getId());
        return ResponseEntity
                .created(location)
                .header("message", "Register User Successful")
                .body(new UserReadModel(newUser));
    }

    @PostMapping(value = "/confirm", params = "token")
    ResponseEntity<UserReadModel> confirmUser(@RequestParam("token") String token,
                                     @RequestParam(required = false, value = "lang") String lang) {
        User confirmedUser = userService.confirmUser(token, lang);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Confirm User Successful")
                .body(new UserReadModel(confirmedUser));
    }

    @PostMapping(value = "/confirm", params = "!token")
    ResponseEntity<?> resendConfirmationMail(@RequestParam("resend") boolean resend,
                                             @RequestParam("userId") String userId,
                                             @RequestParam(required = false, value = "lang") String lang) {
        userService.deleteOldTokenAndResendConfirmationMail(resend, userId, lang);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Resend Confirmation Successful")
                .build();
    }

    @PostMapping(value = "/edit-name")
    ResponseEntity<?> editUserName(@RequestBody @Valid EditUserNameModel editUserNameModel) {
        userService.editUserName(editUserNameModel.getUserId(), editUserNameModel.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Edit User Name Successful")
                .build();
    }

    @PostMapping(value = "/edit-email")
    ResponseEntity<UserReadModel> editUserEmail(@RequestBody @Valid EditUserEmailModel editUserEmailModel,
                                       @RequestParam(required = false, value = "lang") String lang) {
        User editedUser = userService.editUserEmail(
                editUserEmailModel.getUserId(),
                editUserEmailModel.getEmail(),
                lang
        );
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Edit User Email Successful")
                .body(new UserReadModel(editedUser));
    }

    @PostMapping(value = "/edit-password")
    ResponseEntity<UserReadModel> editUserPassword(@RequestBody @Valid EditUserPasswordModel editUserPasswordModel,
                                          @RequestParam(required = false, value = "lang") String lang) {
        User editedUser = userService.editUserPassword(
                editUserPasswordModel.getUserId(),
                editUserPasswordModel.getPassword(),
                lang
        );
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Edit User Password Successful")
                .body(new UserReadModel(editedUser));
    }

    @GetMapping(value = "/refresh-jwt")
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                DecodedJWT decodedJWT = JwtUtil.verifyToken(refresh_token);
                String email = decodedJWT.getSubject();
                User user = userService.findByEmail(email);
                String access_token = JwtUtil.createToken(user, ACCESS_TOKEN_EXPIRATION_MILLIS);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setHeader("message", "Refresh JWT Successful");
                response.setStatus(OK.value());
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception exception) {
                response.setHeader("message", "Refresh JWT Invalid");
                response.setStatus(UNAUTHORIZED.value());
                Map<String, String> error = new HashMap<>();
                error.put("error", exception.getMessage());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    @DeleteMapping
    ResponseEntity<?> deleteUser(Authentication authentication,
                                 @RequestParam(required = false, value = "lang") String lang) {
        userService.deleteUser(authentication.getName(), lang);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("message", "Delete User Successful")
                .build();
    }
}
