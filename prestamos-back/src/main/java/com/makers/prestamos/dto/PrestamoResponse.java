package com.makers.prestamos.dto;

import java.math.BigDecimal;

public record PrestamoResponse(

        Long id,
        BigDecimal monto,
        Integer plazoMeses,
        String estado,
        String usuario

) {}
