package br.com.fatec.shopping.domain.interfaces;

import br.com.fatec.shopping.domain.model.Andar;

import java.util.List;

public interface IAndarService {

    List<Andar> listAndar();
    Andar getAndar(String codigoAndar);
    void insertAndar(Andar andar);
    Andar updateAndar(Andar andar);
    Boolean deleteAndar(String codigoAndar);

}
