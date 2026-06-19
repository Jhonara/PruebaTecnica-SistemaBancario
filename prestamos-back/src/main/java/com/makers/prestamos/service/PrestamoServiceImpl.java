package com.makers.prestamos.service;

import com.makers.prestamos.dto.CrearPrestamoRequest;
import com.makers.prestamos.entity.Prestamo;
import com.makers.prestamos.entity.Usuario;
import com.makers.prestamos.enums.EstadoPrestamo;
import com.makers.prestamos.repository.PrestamoRepository;
import com.makers.prestamos.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PrestamoServiceImpl implements PrestamoService {

    private final PrestamoRepository prestamoRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    @CacheEvict(value = "prestamos", allEntries = true)
    public Prestamo crearPrestamo(
            CrearPrestamoRequest request,
            Long usuarioId) { 

        Usuario usuario = usuarioRepository
                .findById(usuarioId)
                .orElseThrow(() ->
                new RuntimeException("Usuario no encontrado"));

        Prestamo prestamo = Prestamo.builder()
                .monto(request.monto())
                .plazoMeses(request.plazoMeses())
                .estado(EstadoPrestamo.PENDIENTE)
                .usuario(usuario)
                .build();

        return prestamoRepository.save(prestamo);
    }

    @Override
    @Cacheable("prestamos")
    public List<Prestamo> listarPrestamos() {
        return prestamoRepository.findAll();
    }

    @Override
    @Transactional
    @CacheEvict(value = "prestamos", allEntries = true)
    public Prestamo aprobar(Long id) {

        Prestamo prestamo = prestamoRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Prestamo no encontrado"
                        )
                );

        prestamo.setEstado(
                EstadoPrestamo.APROBADO
        );

        return prestamoRepository.save(prestamo);
    }

    @Override
    @Transactional
    @CacheEvict(value = "prestamos", allEntries = true)
    public Prestamo rechazar(Long id) {

        Prestamo prestamo = prestamoRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Prestamo no encontrado"
                        )
                );

        prestamo.setEstado(
                EstadoPrestamo.RECHAZADO
        );

        return prestamoRepository.save(prestamo);
    }
}