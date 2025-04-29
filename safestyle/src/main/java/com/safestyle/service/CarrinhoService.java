package com.safestyle.service;

import com.safestyle.dto.CarrinhoDto;
import com.safestyle.dto.ItemCarrinhoDto;
import com.safestyle.model.Carrinho;
import com.safestyle.model.Produto;
import com.safestyle.repository.CarrinhoRepository;
import com.safestyle.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository repository;
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Carrinho> listarTodos() {
        return repository.findAll();
    }

    public Carrinho salvar(CarrinhoDto dto) {
        Carrinho carrinho = new Carrinho();

        List<Produto> produtos = dto.getItens().stream()
                .map(item -> {
                    Produto produto = produtoRepository.findById(item.getProdutoId())
                            .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + item.getProdutoId()));
                    return produto;
                })
                .toList();

        int quantidadeTotal = dto.getItens().stream()
                .mapToInt(ItemCarrinhoDto::getQuantidade)
                .sum();

        carrinho.setProdutos(produtos); // Repetição de produtos, se quiser controlar quantidade, ideal modelar diferente
        carrinho.setUsuarioId(dto.getUsuarioId());
        carrinho.setQuantidade(quantidadeTotal);
        carrinho.setValorTotal(dto.getValorTotal());

        return repository.save(carrinho);
    }

    public Carrinho buscarPorId(Long id) throws Exception {
        return repository.findById(id)
                .orElseThrow(() -> new Exception("Carrinho não encontrado."));
    }

    public void excluirCarrinho(Long id) {
        repository.deleteById(id);
    }
}
