package com.safestyle.repository;

import com.safestyle.model.Denuncia;
import com.safestyle.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    @Query("SELECT d FROM Denuncia d WHERE d.usuario = :usuario")
    List<Denuncia> findByUsuario(@Param("usuario") Usuario usuario);

    @Query("SELECT d FROM Denuncia d")
    List<Denuncia> findAllDenuncias();


}

