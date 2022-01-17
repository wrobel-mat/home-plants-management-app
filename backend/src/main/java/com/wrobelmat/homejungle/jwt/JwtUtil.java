package com.wrobelmat.homejungle.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.wrobelmat.homejungle.security.user_details.AppUserDetails;
import com.wrobelmat.homejungle.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    public static long ACCESS_TOKEN_EXPIRATION_MILLIS;
    public static long REFRESH_TOKEN_EXPIRATION_MILLIS;
    private static byte[] JWT_SECRET;

    @Value("${app.security.jwt.access-token-expiration-time-millis}")
    public void setAccessTokenExpirationMillis(long accessTokenExpirationMillis) {
        JwtUtil.ACCESS_TOKEN_EXPIRATION_MILLIS = accessTokenExpirationMillis;
    }

    @Value("${app.security.jwt.refresh-token-expiration-time-millis}")
    public void setRefreshTokenExpirationMillis(long refreshTokenExpirationMillis) {
        JwtUtil.REFRESH_TOKEN_EXPIRATION_MILLIS = refreshTokenExpirationMillis;
    }

    @Value("${app.security.jwt.secret}")
    public void setJwtSecret(byte[] jwtSecret) {
        JwtUtil.JWT_SECRET = jwtSecret;
    }


    public static String createToken(AppUserDetails user, long expirationTimeMillis) {
        Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
        return JWT.create()
                .withIssuer("home-jungle")
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTimeMillis))
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
    }

    public static String createToken(User user, long expirationTimeMillis) {
        Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
        return JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTimeMillis))
                .withIssuer("home-jungle")
                .withClaim("roles", Collections.singletonList(user.getRole()))
                .sign(algorithm);
    }

    public static DecodedJWT verifyToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("home-jungle")
                .build();
        return verifier.verify(token);
    }
}
