package com.makers.prestamos.exception;

import java.time.LocalDateTime;

public record ErrorResponse(
        String mensaje,
        LocalDateTime fecha
) {}