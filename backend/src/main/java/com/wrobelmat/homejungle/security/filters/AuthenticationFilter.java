package com.wrobelmat.homejungle.security.filters;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wrobelmat.homejungle.jwt.JwtUtil;
import com.wrobelmat.homejungle.security.user_details.AppUserDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static com.wrobelmat.homejungle.jwt.JwtUtil.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        AppUserDetails user = (AppUserDetails) authentication.getPrincipal();
        try {
            String access_token = JwtUtil.createToken(user, ACCESS_TOKEN_EXPIRATION_MILLIS);
            String refresh_token = JwtUtil.createToken(user, REFRESH_TOKEN_EXPIRATION_MILLIS);
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("access_token", access_token);
            responseData.put("refresh_token", refresh_token);
            response.setContentType(APPLICATION_JSON_VALUE);
            response.setHeader("message", "Authentication Successful");
            new ObjectMapper().writeValue(response.getOutputStream(), responseData);
        } catch (JWTCreationException exception) {
            //Invalid Signing configuration / Couldn't convert Claims.
        }
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setHeader("message", failed.getMessage());
        super.unsuccessfulAuthentication(request, response, failed);
    }
}
