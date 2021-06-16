package br.com.fatec.shopping.domain.services;

import br.com.fatec.shopping.data.repositories.FuncionarioRepository;
import br.com.fatec.shopping.domain.interfaces.IFuncionarioService;
import br.com.fatec.shopping.domain.model.Funcionario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioServiceImpl implements IFuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Override
    public List<Funcionario> listFuncionario() {
        return funcionarioRepository.findAll();
    }

    @Override
    public Funcionario getFuncionario(String cpfFuncionario) {
        Optional<Funcionario> funcionario = funcionarioRepository.findById(cpfFuncionario);

        if (!funcionario.isPresent())
            throw new IllegalArgumentException("Funcionario inexistente");

        return funcionario.get();
    }

    @Override
    public void insertFuncionario(Funcionario funcionario) {

        if (funcionario.getCpfFuncionario().equals(""))
            throw new IllegalArgumentException("CPF inválido");

        if (funcionario.getNomeFuncionario().equals(""))
            throw new IllegalArgumentException("Nome inválido");

        if (funcionario.getEmail().equals(""))
            throw new IllegalArgumentException("Email inválida");

        if (funcionario.getCep().equals(""))
            throw new IllegalArgumentException("Cep inválido");

        funcionarioRepository.save(funcionario);
    }

    @Override
    public Funcionario updateFuncionario(Funcionario funcionario) {
        Optional<Funcionario> fndFuncionario = funcionarioRepository.findById(funcionario.getCpfFuncionario());

        if (!fndFuncionario.isPresent())
            throw new IllegalArgumentException("Funcionario inexistente");

        if (funcionario.getCpfFuncionario().equals(""))
            throw new IllegalArgumentException("CPF inválido");

        if (funcionario.getNomeFuncionario().equals(""))
            throw new IllegalArgumentException("Nome inválido");

        if (funcionario.getEmail().equals(""))
            throw new IllegalArgumentException("Email inválida");

        if (funcionario.getCep().equals(""))
            throw new IllegalArgumentException("Cep inválido");

        funcionarioRepository.save(funcionario);

        return funcionario;
    }

    @Override
    public Boolean deleteFuncionario(String cpfFuncionario) {
        Optional<Funcionario> funcionario = funcionarioRepository.findById(cpfFuncionario);

        if (!funcionario.isPresent())
            throw new IllegalArgumentException("Funcionario inexistente");

        funcionarioRepository.deleteById(cpfFuncionario);

        return true;
    }

}
