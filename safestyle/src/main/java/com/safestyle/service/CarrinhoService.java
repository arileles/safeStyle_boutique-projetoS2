package com.safestyle.service;

import com.safestyle.dto.CarrinhoDto;
import com.safestyle.model.Carrinho;
import com.safestyle.repository.CarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository repository;

    public List<Carrinho> listarTodos() {
        return repository.findAll();
    }

    public Carrinho salvar(CarrinhoDto dto) {
        Carrinho carrinho = new Carrinho();
        carrinho.setProdutos(dto.getProdutos());
        carrinho.setQuantidade(dto.getQuantidade());
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
