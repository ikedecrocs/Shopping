package br.com.fatec.shopping.domain.services;

import br.com.fatec.shopping.data.repositories.ClienteRepository;
import br.com.fatec.shopping.data.repositories.LojaRepository;
import br.com.fatec.shopping.domain.interfaces.IClienteService;
import br.com.fatec.shopping.domain.model.Cliente;
import br.com.fatec.shopping.domain.model.Loja;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements IClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private LojaRepository lojaRepository;

    @Override
    public List<Cliente> listCliente() {
        return clienteRepository.findAll();
    }

    @Override
    public Cliente getCliente(String cpfCliente) {
        Optional<Cliente> cliente = clienteRepository.findById(cpfCliente);

        if (!cliente.isPresent())
            throw new IllegalArgumentException("Cliente inexistente");

        return cliente.get();
    }

    @Override
    public void insertCliente(Cliente cliente) {

        if (cliente.getCpfCliente().equals(""))
            throw new IllegalArgumentException("CPF inválido");

        if (cliente.getNomeCliente().equals(""))
            throw new IllegalArgumentException("Nome inválido");

        if (cliente.getIdade() == 0)
            throw new IllegalArgumentException("Idade inválida");

        clienteRepository.save(cliente);
    }

    @Override
    public Cliente updateCliente(Cliente cliente) {
        Optional<Cliente> fndAndar = clienteRepository.findById(cliente.getCpfCliente());

        if (!fndAndar.isPresent())
            throw new IllegalArgumentException("Cliente inexistente");

        if (cliente.getCpfCliente().equals(""))
            throw new IllegalArgumentException("CPF inválido");

        if (cliente.getNomeCliente().equals(""))
            throw new IllegalArgumentException("Nome inválido");

        if (cliente.getIdade() == 0)
            throw new IllegalArgumentException("Idade inválida");

        clienteRepository.save(cliente);

        return cliente;
    }

    @Override
    public Boolean deleteCliente(String cpfCliente) {
        Optional<Cliente> cliente = clienteRepository.findById(cpfCliente);

        if (!cliente.isPresent())
            throw new IllegalArgumentException("Cliente inexistente");

        clienteRepository.deleteById(cpfCliente);

        return true;
    }

    @Override
    public Boolean enterLoja(Integer codigoLoja, String cpfCliente) {
        Optional<Cliente> cliente = clienteRepository.findById(cpfCliente);

        if(!cliente.isPresent())
            throw new IllegalArgumentException(("Cliente inexistente"));

        Optional<Loja> loja = lojaRepository.findById(codigoLoja);

        if (!loja.isPresent())
            throw new IllegalArgumentException("Loja inexistente");

        if (cliente.get().getLojasVisitadas().contains(loja.get()))
            throw new IllegalArgumentException("Cliente já passou por esta loja");

        List<Loja> listLojas = cliente.get().getLojasVisitadas();
        listLojas.add(loja.get());

        cliente.get().setLojasVisitadas(listLojas);

        clienteRepository.save(cliente.get());

        return true;
    }

}
