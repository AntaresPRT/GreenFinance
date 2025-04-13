package ru.shtanko.userservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.shtanko.userservice.dto.LoginRequest;
import ru.shtanko.userservice.dto.LoginResponse;
import ru.shtanko.userservice.dto.RegisterRequest;
import ru.shtanko.userservice.dto.UserDto;
import ru.shtanko.userservice.entity.User;
import ru.shtanko.userservice.service.UserService;
import ru.shtanko.userservice.utils.JwtUtils;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsernameExists(@RequestParam String username) {
        return ResponseEntity.ok(userService.existsByUsername(username));
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailExists(@RequestParam String email) {
        return ResponseEntity.ok(userService.existsByEmail(email.toLowerCase()));
    }

    @GetMapping("/check-number")
    public ResponseEntity<Boolean> checkNumberExists(@RequestParam String number) {
        return ResponseEntity.ok(userService.existsByNumber(number));
    }

    @PostMapping("/register")
    public void registerUser(@Valid @RequestBody RegisterRequest request) {
        userService.registerUser(request);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtUtils.generateToken(user.getUsername());
            return ResponseEntity.ok(new LoginResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Invalid username or password"));
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(@RequestHeader("X-User-Name") String username) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return ResponseEntity.ok(UserDto.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .createdAt(user.getCreatedAt())
                        .description(user.getDescription()).
                build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDto userDto = new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getCreatedAt(), user.getDescription());
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDto userDto = new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getCreatedAt(),user.getDescription());
        return ResponseEntity.ok(userDto);
    }
}
