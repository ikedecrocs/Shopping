package br.com.fatec.shopping.domain.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Funcionario {

    @Id
    private String cpfFuncionario;
    private String nomeFuncionario;
    private String dataNascimento;

    private String email;
    private String cep;

    @ManyToOne
    @JoinColumn(name = "loja_codigoLoja", referencedColumnName = "codigoLoja")
    private Loja loja;

}
