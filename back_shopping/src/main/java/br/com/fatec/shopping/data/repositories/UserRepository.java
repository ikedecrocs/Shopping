package br.com.fatec.shopping.data.repositories;

import br.com.fatec.shopping.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByLogin(String login);
}
