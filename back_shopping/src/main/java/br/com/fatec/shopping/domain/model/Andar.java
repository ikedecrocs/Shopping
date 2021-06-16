package br.com.fatec.shopping.domain.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Andar {

    @Id
    private String codigoAndar;
    private String nomeAndar;

}
