package br.com.fatec.shopping.application.controllers;

import br.com.fatec.shopping.domain.interfaces.IAndarService;
import br.com.fatec.shopping.domain.model.Andar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/andar")
public class AndarController {

    private final IAndarService andarService;

    public AndarController(IAndarService andarService) {
        this.andarService = andarService;
    }

    @GetMapping("/list-andares")
    public ResponseEntity<Object> listAndares() {
        try {
            return ResponseEntity.ok(andarService.listAndar());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/get-andar")
    public ResponseEntity<Object> getAndar(@RequestParam String codigoAndar) {
        try {
            return ResponseEntity.ok(andarService.getAndar(codigoAndar));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/insert-andar")
    public ResponseEntity<Object> insertAndar(@RequestBody Andar andar) {
        try {
            andarService.insertAndar(andar);
            return ResponseEntity.created(null).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/update-andar")
    public ResponseEntity<Object> updateAndar(@RequestBody Andar andar) {
        try {
            return ResponseEntity.ok(andarService.updateAndar(andar));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete-andar")
    public ResponseEntity<Object> deleteAndar(@RequestParam String codigoAndar) {
        try {
            return ResponseEntity.ok(andarService.deleteAndar(codigoAndar));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
