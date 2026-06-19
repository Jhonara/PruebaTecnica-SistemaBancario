package com.makers.prestamos.dto;

public record LoginRequest(
        String username,
        String password
) {}