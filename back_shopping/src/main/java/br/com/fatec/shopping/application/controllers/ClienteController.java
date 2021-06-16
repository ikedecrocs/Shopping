package br.com.fatec.shopping.application.controllers;

import br.com.fatec.shopping.domain.interfaces.IClienteService;
import br.com.fatec.shopping.domain.model.Cliente;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    private IClienteService clienteService;

    public ClienteController(IClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/list-clientes")
    public ResponseEntity<Object> listClientes() {
        try {
            return ResponseEntity.ok(clienteService.listCliente());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/get-cliente")
    public ResponseEntity<Object> getCliente(@RequestParam String cpfCliente) {
        try {
            return ResponseEntity.ok(clienteService.getCliente(cpfCliente));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/insert-cliente")
    public ResponseEntity<Object> insertCliente(@RequestBody Cliente cliente) {
        try {
            clienteService.insertCliente(cliente);
            return ResponseEntity.created(null).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/update-cliente")
    public ResponseEntity<Object> updateCliente(@RequestBody Cliente cliente) {
        try {
            return ResponseEntity.ok(clienteService.updateCliente(cliente));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete-cliente")
    public ResponseEntity<Object> deleteCliente(@RequestParam String cpfCliente) {
        try {
            return ResponseEntity.ok(clienteService.deleteCliente(cpfCliente));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/enter-loja")
    public ResponseEntity<Object> enterLoja(@RequestParam Integer codigoLoja, @RequestParam String cpfCliente) {
        try {
            return ResponseEntity.ok(clienteService.enterLoja(codigoLoja, cpfCliente));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
