package br.com.fatec.shopping.domain.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Loja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codigoLoja;
    private String cnpjLoja;
    private String nomeLoja;
    private Integer numeroFuncionarios;

    @ManyToOne
    @JoinColumn(name = "andar_codigoAndar", referencedColumnName = "codigoAndar")
    private Andar andar;

}
