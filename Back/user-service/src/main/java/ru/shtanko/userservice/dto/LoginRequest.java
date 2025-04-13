package ru.shtanko.userservice.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Data
@Getter
@Setter
public class LoginRequest {
    private String username;
    private String password;
}
