package br.com.fatec.shopping.domain.interfaces;

import br.com.fatec.shopping.domain.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IUserService extends UserDetailsService {

    List<User> listUser();
    User getUser(String login);
    void insertUser(User user);
    User updateUser(User user);
    Boolean deleteUser(String login);

}
