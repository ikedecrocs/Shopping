package br.com.fatec.shopping.domain.services;

import br.com.fatec.shopping.data.repositories.AndarRepository;
import br.com.fatec.shopping.domain.interfaces.IAndarService;
import br.com.fatec.shopping.domain.model.Andar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AndarServiceImpl implements IAndarService {

    @Autowired
    private AndarRepository andarRepository;

    @Override
    public List<Andar> listAndar() {
        return andarRepository.findAll();
    }

    @Override
    public Andar getAndar(String codigoAndar) {
        Optional<Andar> andar = andarRepository.findById(codigoAndar);

        if (!andar.isPresent())
            throw new IllegalArgumentException("Andar inexistente");

        return andar.get();
    }

    @Override
    public void insertAndar(Andar andar) {

        if (andar.getCodigoAndar().equals(""))
            throw new IllegalArgumentException("Código de andar inválido");

        if (andar.getNomeAndar().equals(""))
            throw new IllegalArgumentException("Nome inválido");

        andarRepository.save(andar);
    }

    @Override
    public Andar updateAndar(Andar andar) {
        Optional<Andar> fndAndar = andarRepository.findById(andar.getCodigoAndar());

        if (!fndAndar.isPresent())
            throw new IllegalArgumentException("Andar inexistente");

        if (andar.getCodigoAndar().equals(""))
            throw new IllegalArgumentException("Código de andar inválido");

        if (andar.getNomeAndar().equals(""))
            throw new IllegalArgumentException("Nome inválido");

        andarRepository.save(andar);

        return andar;
    }

    @Override
    public Boolean deleteAndar(String codigoAndar) {
        Optional<Andar> andar = andarRepository.findById(codigoAndar);

        if (!andar.isPresent())
            throw new IllegalArgumentException("Andar inexistente");

        andarRepository.deleteById(codigoAndar);

        return true;
    }

}
