package ru.shtanko.userservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.shtanko.userservice.dto.RegisterRequest;
import ru.shtanko.userservice.entity.User;
import ru.shtanko.userservice.repository.UserRepository;
import ru.shtanko.userservice.service.UserService;

import java.time.LocalDate;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void registerUser(RegisterRequest request) {
        User user = new User();
        if (!userRepository.existsByUsername(request.getUsername()) &&
            !userRepository.existsByEmail(request.getEmail()) &&
            !userRepository.existsByNumber(request.getNumber())
        ) {
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setNumber(request.getNumber());
        } else {
            throw new IllegalArgumentException("Данные дублируются!");
        }
        if(request.getDescription() != null) {
            user.setDescription(request.getDescription());
        }
        user.setRole("ROLE_USER");
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(LocalDate.now());
        userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public Boolean existsByNumber(String number) {
        return userRepository.existsByNumber(number);
    }


}
