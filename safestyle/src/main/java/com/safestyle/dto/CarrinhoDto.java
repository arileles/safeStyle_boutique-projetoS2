package com.safestyle.dto;

import com.safestyle.model.Produto;
import java.util.List;

public class CarrinhoDto {

    private List<Produto> produtos;  // Lista de produtos no carrinho
    private Long usuarioId;  // ID do usuário dono do carrinho
    private int quantidade;  // Quantidade de itens no carrinho
    private double valorTotal;  // Valor total do carrinho

    // Getter e Setter para produtos
    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }

    // Getter e Setter para usuarioId
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    // Getter e Setter para quantidade
    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    // Getter e Setter para valorTotal
    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
}