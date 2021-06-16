package br.com.fatec.shopping.application.controllers;

import br.com.fatec.shopping.domain.interfaces.IFuncionarioService;
import br.com.fatec.shopping.domain.model.Funcionario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {

    private IFuncionarioService funcionarioService;

    public FuncionarioController(IFuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping("/list-funcionarios")
    public ResponseEntity<Object> listFuncionarios() {
        try {
            return ResponseEntity.ok(funcionarioService.listFuncionario());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/get-funcionario")
    public ResponseEntity<Object> getFuncionario(@RequestParam String cpfFuncionario) {
        try {
            return ResponseEntity.ok(funcionarioService.getFuncionario(cpfFuncionario));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/insert-funcionario")
    public ResponseEntity<Object> insertFuncionario(@RequestBody Funcionario funcionario) {
        try {
            funcionarioService.insertFuncionario(funcionario);
            return ResponseEntity.created(null).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/update-funcionario")
    public ResponseEntity<Object> updateFuncionario(@RequestBody Funcionario funcionario) {
        try {
            return ResponseEntity.ok(funcionarioService.updateFuncionario(funcionario));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete-funcionario")
    public ResponseEntity<Object> deleteFuncionario(@RequestParam String cpfFuncionario) {
        try {
            return ResponseEntity.ok(funcionarioService.deleteFuncionario(cpfFuncionario));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
