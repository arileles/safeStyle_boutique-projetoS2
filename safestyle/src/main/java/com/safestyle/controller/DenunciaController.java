package com.safestyle.controller;

import com.safestyle.dto.DenunciaDto;
import com.safestyle.model.Denuncia;
import com.safestyle.model.Usuario;
import com.safestyle.repository.DenunciaRepository;
import com.safestyle.repository.UsuarioRepository;
import com.safestyle.service.DenunciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/denuncias")
public class DenunciaController {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Autowired
    private DenunciaRepository denunciaRepository;

    @Autowired
    private DenunciaService denunciaService;

    @PostMapping
    public DenunciaDto enviar(@RequestBody DenunciaDto dto) {
        return denunciaService.enviarDenuncia(dto);
    }

    @GetMapping("/minhas")
    public ResponseEntity<List<DenunciaDto>> minhasDenuncias(@RequestParam("usuario_id") Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        List<DenunciaDto> denuncias = denunciaService.listarPorUsuario(usuario.getId());
        return ResponseEntity.ok(denuncias);
    }

    @GetMapping
    public List<DenunciaDto> listarTodasDenuncias() {
        return denunciaService.listarTodasDenuncias();
    }

}
