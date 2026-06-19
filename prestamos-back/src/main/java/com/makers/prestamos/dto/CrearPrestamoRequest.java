package com.makers.prestamos.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record CrearPrestamoRequest(

        @NotNull
        @Positive
        BigDecimal monto,

        @NotNull
        @Min(1)
        Integer plazoMeses

) {}