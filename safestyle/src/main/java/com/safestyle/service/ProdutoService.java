package com.safestyle.service;

import com.safestyle.dto.ProdutoDto;
import com.safestyle.model.Produto;
import com.safestyle.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private final ProdutoRepository repository;

    // Construtor manual para injeção de dependência
    @Autowired
    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    public Produto salvar(ProdutoDto dto) {
        Produto produto = new Produto();
        produto.setNome(dto.getNome());
        produto.setDescricao(dto.getDescricao());
        produto.setPreco(dto.getPreco());
        produto.setImagemUrl(dto.getImagemUrl());
        return repository.save(produto);
    }

    public Produto buscarPorId(Long id) throws Exception {
        return repository.findById(id)
                .orElseThrow(() -> new Exception("Produto não encontrado."));
    }

    public Produto atualizar(Long id, ProdutoDto dto) throws Exception {
        Produto produtoExistente = repository.findById(id).orElseThrow(() -> new Exception("Produto não encontrado"));

        // Atualize os campos do produto com os dados do dto
        produtoExistente.setNome(dto.getNome());
        produtoExistente.setPreco(dto.getPreco());
        produtoExistente.setDescricao(dto.getDescricao());

        // Salva o produto atualizado
        return repository.save(produtoExistente);
    }

    public void excluirProduto(Long id) {
        repository.deleteById(id);
    }
}
