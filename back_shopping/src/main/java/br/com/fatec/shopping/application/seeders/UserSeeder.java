package br.com.fatec.shopping.application.seeders;

import br.com.fatec.shopping.data.repositories.RoleRepository;
import br.com.fatec.shopping.data.repositories.UserRepository;
import br.com.fatec.shopping.domain.model.Role;
import br.com.fatec.shopping.domain.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserSeeder {
    private static UserRepository userRepository;
    private static RoleRepository roleRepository;

    @Autowired
    public UserSeeder(
            UserRepository _userRepository,
            RoleRepository _roleRepository
    ) {
        this.userRepository = _userRepository;
        this.roleRepository = _roleRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        if (userRepository.findAll().isEmpty()) {
            System.out.println("Seed Event Started");
            seedUserTable();
            System.out.println("Seed Event Ended");
        }
    }

    private void seedUserTable() {
        User user = new User();

        user.setLogin("admin");

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode("123"));

        Role roleAdmin = new Role();
        roleAdmin.setId(1);
        roleAdmin.setName("ROLE_ADMIN");
        roleRepository.save(roleAdmin);

        List<Role> listRole = new ArrayList<Role>();
        listRole.add(roleAdmin);

        user.setRoles(listRole);

        userRepository.save(user);
        System.out.println("Seed User Done");
    }

}

