package br.com.fatec.shopping.domain.services;

import br.com.fatec.shopping.data.repositories.LojaRepository;
import br.com.fatec.shopping.domain.interfaces.ILojaService;
import br.com.fatec.shopping.domain.model.Loja;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LojaServiceImpl implements ILojaService {

    @Autowired
    private LojaRepository lojaRepository;

    @Override
    public List<Loja> listLoja() {
        return lojaRepository.findAll();
    }

    @Override
    public Loja getLoja(Integer codigoLoja) {
        Optional<Loja> loja = lojaRepository.findById(codigoLoja);

        if (!loja.isPresent())
            throw new IllegalArgumentException("Loja inexistente");

        return loja.get();
    }

    @Override
    public void insertLoja(Loja loja) {
        if (loja.getCnpjLoja().equals(""))
            throw new IllegalArgumentException("Cnpj inválido");

        if (loja.getNomeLoja().equals(""))
            throw new IllegalArgumentException("Nome inválido");

        lojaRepository.save(loja);
    }

    @Override
    public Loja updateLoja(Loja loja) {
        Optional<Loja> fndLoja = lojaRepository.findById(loja.getCodigoLoja());

        if (!fndLoja.isPresent())
            throw new IllegalArgumentException("Loja inexistente");

        if (loja.getCodigoLoja().equals(""))
            throw new IllegalArgumentException("Código da loja inválida");

        if (loja.getCnpjLoja().equals(""))
            throw new IllegalArgumentException("Cnpj inválido");

        if (loja.getNomeLoja().equals(""))
            throw new IllegalArgumentException("Nome inválido");

        lojaRepository.save(loja);

        return loja;
    }

    @Override
    public Boolean deleteLoja(Integer codigoLoja) {
        Optional<Loja> loja = lojaRepository.findById(codigoLoja);

        if (!loja.isPresent())
            throw new IllegalArgumentException("Loja inexistente");

        lojaRepository.deleteById(codigoLoja);

        return true;
    }

}
