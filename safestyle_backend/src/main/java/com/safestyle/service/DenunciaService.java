package com.safestyle.service;

import com.safestyle.dto.DenunciaDto;
import com.safestyle.model.Denuncia;
import com.safestyle.model.Usuario;
import com.safestyle.repository.DenunciaRepository;
import com.safestyle.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DenunciaService {

    @Autowired
    private DenunciaRepository denunciaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public DenunciaDto enviarDenuncia(DenunciaDto dto) {
        // Aqui você pega o ID do usuário, não o objeto diretamente
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Denuncia denuncia = new Denuncia();
        denuncia.setUsuario(usuario); // Associar o objeto Usuario à Denuncia

        // Define a data de criação com a hora atual no fuso horário do Brasil (GMT-3)
        ZonedDateTime dataCriacaoBrasilia = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"));
        denuncia.setDataCriacao(dataCriacaoBrasilia.toLocalDateTime()); // Definindo a dataCriacao com a hora atual

        denuncia.setDescricao(dto.getDescricao());
        denuncia.setData(dto.getData());
        denuncia.setHora(dto.getHora());

        denuncia = denunciaRepository.save(denuncia);

        dto.setDataCriacao(denuncia.getDataCriacao()); // Garantir que a dataCriacao está sendo preenchida
        dto.setId(denuncia.getId()); // Preencher o ID que foi gerado pelo banco

        return dto;
    }

    public List<DenunciaDto> listarPorUsuario(Long usuarioId) {
        // Buscando o usuário pelo ID
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Buscando as denúncias para o usuário
        return denunciaRepository.findByUsuario(usuario)
                .stream()
                .map(d -> {
                    DenunciaDto dto = new DenunciaDto();
                    dto.setDescricao(d.getDescricao());
                    dto.setData(d.getData());
                    dto.setHora(d.getHora());
                    dto.setUsuarioId(usuario.getId()); // Passando o ID do usuário, não o objeto
                    dto.setDataCriacao(d.getDataCriacao()); // Atribuindo a dataCriacao ao DTO
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private DenunciaDto toDto(Denuncia denuncia) {
        DenunciaDto dto = new DenunciaDto();
        dto.setDescricao(denuncia.getDescricao());
        dto.setDataCriacao(denuncia.getDataCriacao());  // dataCriacao já é LocalDateTime, então é diretamente atribuído
        dto.setData(denuncia.getData());
        dto.setHora(denuncia.getHora());
        dto.setUsuarioId(denuncia.getUsuario().getId()); // Passando o ID do usuário
        return dto;
    }

    // Método para listar todas as denúncias
    public List<DenunciaDto> listarTodasDenuncias() {
        List<Denuncia> denuncias = denunciaRepository.findAllDenuncias();
        return denuncias.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

}
