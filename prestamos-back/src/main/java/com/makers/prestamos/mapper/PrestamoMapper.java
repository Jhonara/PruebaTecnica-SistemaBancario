package com.makers.prestamos.mapper;

import com.makers.prestamos.dto.PrestamoResponse;
import com.makers.prestamos.entity.Prestamo;

public class PrestamoMapper {

    public static PrestamoResponse toResponse(
            Prestamo prestamo){

        return new PrestamoResponse(
                prestamo.getId(),
                prestamo.getMonto(),
                prestamo.getPlazoMeses(),
                prestamo.getEstado().name(),
                prestamo.getUsuario().getNombre()
        );
    }
}