package br.com.fatec.shopping.domain.services;

import br.com.fatec.shopping.data.repositories.UserRepository;
import br.com.fatec.shopping.domain.interfaces.IUserService;
import br.com.fatec.shopping.domain.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> listUser() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String login) {
        Optional<User> user = userRepository.findById(login);

        if (!user.isPresent())
            throw new IllegalArgumentException("Usuário inexistente");

        return user.get();
    }

    @Override
    public void insertUser(User user) {
        if (user.getLogin().equals(""))
            throw new IllegalArgumentException("Login inválido");

        if (user.getPassword().equals(""))
            throw new IllegalArgumentException("Senha inválida");

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        Optional<User> fndUser = userRepository.findById(user.getLogin());

        if (!fndUser.isPresent())
            throw new IllegalArgumentException("Usuário inexistente");

        if (user.getLogin().equals(""))
            throw new IllegalArgumentException("Login inválido");

        if (user.getPassword().equals(""))
            throw new IllegalArgumentException("Senha inválida");

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return user;
    }

    @Override
    public Boolean deleteUser(String login) {
        Optional<User> user = userRepository.findById(login);

        if (!user.isPresent())
            throw new IllegalArgumentException("Usuário inexistente");

        userRepository.deleteById(login);

        return true;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userRepository.findByLogin(login);
        if (user == null) {
            throw new UsernameNotFoundException("user não encontrado");
        }

        return user;
    }

}
