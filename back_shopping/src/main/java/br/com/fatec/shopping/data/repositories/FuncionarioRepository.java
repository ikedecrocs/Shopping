package br.com.fatec.shopping.data.repositories;

import br.com.fatec.shopping.domain.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, String> {
}
