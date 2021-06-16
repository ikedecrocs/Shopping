package br.com.fatec.shopping.application.dto;

import br.com.fatec.shopping.domain.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

@Data
public class LoginDTO {
    private User me;
    private String token;

    public static LoginDTO create(User user, String token) {
        LoginDTO dto = new LoginDTO();
        dto.token = token;
        dto.me = user;
        return dto;
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper m = new ObjectMapper();
        return m.writeValueAsString(this);
    }
}
