package com.safestyle.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
            name = "carrinho_produto",
            joinColumns = @JoinColumn(name = "carrinho_id")
    )
    private List<Produto> produtos;  // Lista de produtos no carrinho
    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    private int quantidade;  // Quantidade de itens no carrinho
    private double valorTotal;  // Valor total do carrinho

    // Getter e Setter para id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter e Setter para produtos
    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }

    // Getter e Setter para usuarioId
    public Usuario getUsuarioId() {
        return usuario;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuario = usuario;
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
