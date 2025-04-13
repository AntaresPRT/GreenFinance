package ru.shtanko.projectservice.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private LocalDate createdAt;
    private String description;
}
