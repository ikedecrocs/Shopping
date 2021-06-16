package br.com.fatec.shopping.application.controllers;

import br.com.fatec.shopping.domain.interfaces.IUserService;
import br.com.fatec.shopping.domain.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/list-users")
    public ResponseEntity<Object> listUsers() {
        try {
            return ResponseEntity.ok(userService.listUser());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/get-user")
    public ResponseEntity<Object> getUser(@RequestParam String login) {
        try {
            return ResponseEntity.ok(userService.getUser(login));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/insert-user")
    public ResponseEntity<Object> insertUser(@RequestBody User user) {
        try {
            userService.insertUser(user);
            return ResponseEntity.created(null).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/update-user")
    public ResponseEntity<Object> updateUser(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.updateUser(user));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete-user")
    public ResponseEntity<Object> deleteUser(@RequestParam String login) {
        try {
            return ResponseEntity.ok(userService.deleteUser(login));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
