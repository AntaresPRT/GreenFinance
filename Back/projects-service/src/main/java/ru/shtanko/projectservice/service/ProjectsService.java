package ru.shtanko.projectservice.service;

import ru.shtanko.projectservice.dto.ProjectDto;
import ru.shtanko.projectservice.entity.Project;

import java.util.List;

public interface ProjectsService {
    ProjectDto createProject(ProjectDto project, String username);

    List<ProjectDto> getProjectsBy(Long authorId);

    List<ProjectDto> getAllProjects();

    Project updateProject(Long id, ProjectDto updatedProject, String username);

    void deleteProject(Long id, String username);

    Project getProjectById(Long id);
}
