package ru.shtanko.userservice.service;

import ru.shtanko.userservice.dto.RegisterRequest;
import ru.shtanko.userservice.entity.User;

import java.util.Optional;

public interface UserService {
    void registerUser(RegisterRequest request);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String lowerCase);

    Boolean existsByNumber(String number);
}
