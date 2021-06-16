package br.com.fatec.shopping.domain.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Cliente {

    @Id
    private String cpfCliente;
    private String nomeCliente;
    private Integer idade;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "cliente_loja",
            joinColumns = @JoinColumn(name = "cliente_cpfCliente", referencedColumnName = "cpfCliente"),
            inverseJoinColumns = @JoinColumn(name = "loja_codigoLoja", referencedColumnName = "codigoLoja"))
    private List<Loja> lojasVisitadas;

}
