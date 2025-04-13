package ru.shtanko.projectservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.shtanko.projectservice.entity.Company;

@Data
public class ProjectRequest {
    private ProjectDto project;
    private Company company;
}
