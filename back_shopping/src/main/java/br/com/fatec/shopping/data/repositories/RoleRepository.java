package br.com.fatec.shopping.data.repositories;

import br.com.fatec.shopping.domain.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
