package com.makers.prestamos.controller;

import com.makers.prestamos.dto.LoginRequest;
import com.makers.prestamos.dto.LoginResponse;
import com.makers.prestamos.entity.Usuario;
import com.makers.prestamos.repository.UsuarioRepository;
import com.makers.prestamos.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        Usuario usuario = usuarioRepository
                .findByEmail(request.username())
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado")
                );

        if (!usuario.getPassword().equals(request.password())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtService.generateToken(
                usuario.getEmail(),
                usuario.getRol().name()
        );

        return ResponseEntity.ok(
                new LoginResponse(token)
        );
    }
}