package com.safestyle.dto;

import java.util.List;

public class CarrinhoDto {

    private List<ItemCarrinhoDto> itens;
    private Long usuarioId;
    private double valorTotal;

    // Getters e Setters
    public List<ItemCarrinhoDto> getItens() {
        return itens;
    }

    public void setItens(List<ItemCarrinhoDto> itens) {
        this.itens = itens;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
}
