package com.safestyle.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UsuarioDto {
    private Long id;
    private String nome;
    private String email;
    private String senha;

    public void setId(Long id) {
        this.id = id;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Long getId() {
     return id;
    }
    public String getNome() {
        return nome;
    }
    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }
}
