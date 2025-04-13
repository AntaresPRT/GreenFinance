package ru.shtanko.projectservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyDto {
    private Long id;
    private String name;
    private String description;
    private String tags;
    private UserDto author;
}
