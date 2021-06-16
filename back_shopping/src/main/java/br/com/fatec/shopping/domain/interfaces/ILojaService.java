package br.com.fatec.shopping.domain.interfaces;

import br.com.fatec.shopping.domain.model.Loja;

import java.util.List;

public interface ILojaService {

    List<Loja> listLoja();
    Loja getLoja(Integer codigoLoja);
    void insertLoja(Loja loja);
    Loja updateLoja(Loja loja);
    Boolean deleteLoja(Integer codigoLoja);

}
