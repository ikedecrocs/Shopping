package br.com.fatec.shopping.domain.interfaces;

import br.com.fatec.shopping.domain.model.Cliente;

import java.util.List;

public interface IClienteService {

    List<Cliente> listCliente();
    Cliente getCliente(String cpfCliente);
    void insertCliente(Cliente cliente);
    Cliente updateCliente(Cliente cliente);
    Boolean deleteCliente(String cpfCliente);
    Boolean enterLoja(Integer codigoLoja, String cpfCliente);

}
