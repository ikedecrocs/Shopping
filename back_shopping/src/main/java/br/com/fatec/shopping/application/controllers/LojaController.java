package br.com.fatec.shopping.application.controllers;

import br.com.fatec.shopping.domain.interfaces.ILojaService;
import br.com.fatec.shopping.domain.model.Loja;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loja")
public class LojaController {

    private ILojaService lojaService;

    public LojaController(ILojaService lojaService) {
        this.lojaService = lojaService;
    }

    @GetMapping("/list-lojas")
    public ResponseEntity<Object> listlojas() {
        try {
            return ResponseEntity.ok(lojaService.listLoja());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/get-loja")
    public ResponseEntity<Object> getLoja(@RequestParam Integer codigoLoja) {
        try {
            return ResponseEntity.ok(lojaService.getLoja(codigoLoja));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/insert-loja")
    public ResponseEntity<Object> insertLoja(@RequestBody Loja loja) {
        try {
            lojaService.insertLoja(loja);
            return ResponseEntity.created(null).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/update-loja")
    public ResponseEntity<Object> updateLoja(@RequestBody Loja loja) {
        try {
            return ResponseEntity.ok(lojaService.updateLoja(loja));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete-loja")
    public ResponseEntity<Object> deleteLoja(@RequestParam Integer codigoLoja) {
        try {
            return ResponseEntity.ok(lojaService.deleteLoja(codigoLoja));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
