package com.safestyle.controller;

import com.safestyle.dto.UsuarioDto;
import com.safestyle.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioDto> criarUsuario(@RequestBody UsuarioDto dto) {
        UsuarioDto criado = usuarioService.criarUsuario(dto);
        return ResponseEntity.ok(criado);
    }

    @GetMapping
    public List<UsuarioDto> listarUsuarios() {
        return usuarioService.listarTodos();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long id) {
        usuarioService.excluirUsuario(id);
        return ResponseEntity.noContent().build();
    }

}
