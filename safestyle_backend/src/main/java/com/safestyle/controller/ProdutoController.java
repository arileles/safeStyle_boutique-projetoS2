package com.safestyle.controller;

import com.safestyle.dto.ProdutoDto;
import com.safestyle.model.Produto;
import com.safestyle.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // permite chamadas do Angular
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @GetMapping
    public List<Produto> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    public Produto criar(@RequestBody ProdutoDto dto) {
        return service.salvar(dto);
    }

    @GetMapping("/{id}")
    public Produto buscarPorId(@PathVariable Long id) throws Exception {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Produto atualizar(@PathVariable Long id, @RequestBody ProdutoDto dto) throws Exception {
        return service.atualizar(id, dto); // Chama o método de atualização no serviço
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable Long id) {
        service.excluirProduto(id);
        return ResponseEntity.noContent().build();
    }
}
