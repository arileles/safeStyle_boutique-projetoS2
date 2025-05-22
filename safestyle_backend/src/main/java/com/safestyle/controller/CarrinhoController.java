package com.safestyle.controller;

import com.safestyle.dto.CarrinhoDto;
import com.safestyle.model.Carrinho;
import com.safestyle.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrinho")
@CrossOrigin(origins = "http://localhost:4200") // permite chamadas do Angular
public class CarrinhoController {

    @Autowired
    private final CarrinhoService carrinhoService;

    // Construtor manual para injeção de dependência
    @Autowired
    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @GetMapping
    public List<Carrinho> listarTodos() {
        return carrinhoService.listarTodos();
    }

    @PostMapping
    public Carrinho salvar(@RequestBody CarrinhoDto dto) {
        return carrinhoService.salvar(dto);
    }

    @GetMapping("/{id}")
    public Carrinho buscarPorId(@PathVariable Long id) throws Exception {
        return carrinhoService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirCarrinho(@PathVariable Long id) {
        carrinhoService.excluirCarrinho(id);
        return ResponseEntity.noContent().build();
    }
}
