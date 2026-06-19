package com.makers.prestamos.controller;

import com.makers.prestamos.dto.CrearPrestamoRequest;
import com.makers.prestamos.entity.Prestamo;
import com.makers.prestamos.service.PrestamoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.makers.prestamos.dto.PrestamoResponse;
import com.makers.prestamos.mapper.PrestamoMapper;

import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
@RequiredArgsConstructor
public class PrestamoController {

    private final PrestamoService prestamoService;

    @PostMapping
    public ResponseEntity<PrestamoResponse> crearPrestamo(
            @Valid @RequestBody CrearPrestamoRequest request){

        return ResponseEntity.ok(
                PrestamoMapper.toResponse(
                        prestamoService.crearPrestamo(request,1L)
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<PrestamoResponse>> listar() {

        List<PrestamoResponse> response =
                prestamoService.listarPrestamos()
                        .stream()
                        .map(PrestamoMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/aprobar")
    public ResponseEntity<PrestamoResponse> aprobar(
            @PathVariable Long id){

        return ResponseEntity.ok(
                PrestamoMapper.toResponse(
                        prestamoService.aprobar(id)
                )
        );
    }

    @PutMapping("/{id}/rechazar")
    public ResponseEntity<PrestamoResponse> rechazar(
            @PathVariable Long id){

        return ResponseEntity.ok(
                PrestamoMapper.toResponse(
                        prestamoService.rechazar(id)
                )
        );
    }
}