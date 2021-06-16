package br.com.fatec.shopping.data.repositories;

import br.com.fatec.shopping.domain.model.Loja;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LojaRepository extends JpaRepository<Loja, Integer> {
}
