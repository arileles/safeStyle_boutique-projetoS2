package com.safestyle.repository;

import com.safestyle.model.Carrinho;
import com.safestyle.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {

}
