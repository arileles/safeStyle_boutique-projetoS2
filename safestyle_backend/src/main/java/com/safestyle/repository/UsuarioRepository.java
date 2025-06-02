package com.safestyle.repository;

import com.safestyle.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findById(Usuario usuarioId);

    @Query("SELECT u FROM Usuario u WHERE u.id = :id")
    Usuario findUsuarioById(@Param("id") Long id);
}
