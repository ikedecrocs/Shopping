package br.com.fatec.shopping.data.repositories;

import br.com.fatec.shopping.domain.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, String> {
}
