package com.cognizant.spring_learn.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticate")
public class JwtController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public JwtResponse createToken(
            @RequestBody JwtRequest request) {

        String token =
                jwtUtil.generateToken(
                        request.getUsername());

        return new JwtResponse(token);
    }
}