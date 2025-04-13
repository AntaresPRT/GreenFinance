package ru.shtanko.projectservice.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class ProjectDto {
    private Long id;
    private String title;
    private String description;
    private UserDto author;
    private LocalDateTime createdAt;
    private BigDecimal goalAmount;
    private BigDecimal collectedAmount;
    private LocalDate deadline;
    private String esgFactors;
}
