package com.safestyle.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.safestyle.model.Usuario;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class DenunciaDto {
    private Long id;
    private String descricao;
    private LocalDate data;
    private LocalTime hora;
    private Long usuarioId;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")  // Formato ISO padrão
    private LocalDateTime dataCriacao;

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getData() {
        return data;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
    public void setId(Long id) {
        this.id = id;
    }
}
