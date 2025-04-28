package com.safestyle.service;

import com.safestyle.dto.UsuarioDto;
import com.safestyle.model.Usuario;
import com.safestyle.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDto criarUsuario(UsuarioDto dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(dto.getSenha());
        usuario = usuarioRepository.save(usuario);

        // Retorna o DTO com os dados salvos
        UsuarioDto resposta = new UsuarioDto();
        resposta.setNome(usuario.getNome());
        resposta.setEmail(usuario.getEmail());
        // senha não é retornada por segurança
        return resposta;
    }

    public List<UsuarioDto> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UsuarioDto convertToDTO(Usuario usuario) {
        UsuarioDto dto = new UsuarioDto();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        return dto;
    }

    public void excluirUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }


}
