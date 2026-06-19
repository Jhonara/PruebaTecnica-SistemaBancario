package com.makers.prestamos.service;

import com.makers.prestamos.dto.CrearPrestamoRequest;
import com.makers.prestamos.entity.Prestamo;

import java.util.List;

public interface PrestamoService {

    Prestamo crearPrestamo(
            CrearPrestamoRequest request,
            Long usuarioId);

    List<Prestamo> listarPrestamos();

    Prestamo aprobar(Long id);

    Prestamo rechazar(Long id);
}