package br.com.fatec.shopping.domain.interfaces;

import br.com.fatec.shopping.domain.model.Funcionario;

import java.util.List;

public interface IFuncionarioService {

    List<Funcionario> listFuncionario();
    Funcionario getFuncionario(String cpfFuncionario);
    void insertFuncionario(Funcionario funcionario);
    Funcionario updateFuncionario(Funcionario funcionario);
    Boolean deleteFuncionario(String cpfFuncionario);

}
