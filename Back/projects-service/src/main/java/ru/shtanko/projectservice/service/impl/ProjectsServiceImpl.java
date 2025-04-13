package ru.shtanko.projectservice.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.shtanko.projectservice.client.UserServiceClient;
import ru.shtanko.projectservice.dto.ProjectDto;
import ru.shtanko.projectservice.dto.UserDto;
import ru.shtanko.projectservice.entity.Project;
import ru.shtanko.projectservice.repository.ProjectRepository;
import ru.shtanko.projectservice.service.ProjectsService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectsServiceImpl implements ProjectsService {

    private final ProjectRepository projectRepository;
    private final UserServiceClient userServiceClient;

    public ProjectDto createProject(ProjectDto request, String username) {
        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setGoalAmount(request.getGoalAmount());
        project.setDeadline(request.getDeadline());
        project.setAuthorId(getUserIdByUsername(username));
        project.setCreatedAt(LocalDateTime.now());
        project.setEsgFactors(request.getEsgFactors());
        projectRepository.save(project);
        return request;
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public List<ProjectDto> getProjectsBy(Long userId) {
        List<ProjectDto> projectDtos = new ArrayList<>();
        if (userId != null) {
            List<Project> projects = projectRepository.findByAuthorId(userId);
            for (Project project : projects) {
                ProjectDto projectDto = ProjectDto.builder().title(project.getTitle())
                        .id(project.getId())
                        .description(project.getDescription())
                        .author(userServiceClient.getUserById(project.getAuthorId()))
                        .goalAmount(project.getGoalAmount())
                        .collectedAmount(project.getCollectedAmount())
                        .deadline(project.getDeadline())
                        .createdAt(project.getCreatedAt())
                        .esgFactors(project.getEsgFactors())
                        .build();
                projectDtos.add(projectDto);
            }
        }
        return projectDtos;
    }

    public List<ProjectDto> getAllProjects() {
        List<ProjectDto> projectDtos = new ArrayList<>();
        List<Project> projects = projectRepository.findAll();
        for (Project project : projects) {
            ProjectDto projectDto = ProjectDto.builder().title(project.getTitle())
                    .id(project.getId())
                    .description(project.getDescription())
                    .author(userServiceClient.getUserById(project.getAuthorId()))
                    .goalAmount(project.getGoalAmount())
                    .collectedAmount(project.getCollectedAmount())
                    .deadline(project.getDeadline())
                    .createdAt(project.getCreatedAt())
                    .esgFactors(project.getEsgFactors())
                    .build();
            projectDtos.add(projectDto);
        }
        return projectDtos;
    }

    @Transactional
    public Project updateProject(Long id, ProjectDto updatedProject, String username) {
        Project project = getProjectById(id);
        if (!project.getAuthorId().equals(getUserIdByUsername(username))) {
            throw new RuntimeException("You are not the author of this ad");
        }
        project.setTitle(updatedProject.getTitle());
        project.setDescription(updatedProject.getDescription());
        project.setDeadline(updatedProject.getDeadline());
        project.setGoalAmount(updatedProject.getGoalAmount());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id, String username) {
        Project project = getProjectById(id);
        if (!project.getAuthorId().equals(getUserIdByUsername(username))) {
            throw new RuntimeException("You are not the author of this project");
        }
        projectRepository.delete(project);
    }

    private Long getUserIdByUsername(String username) {
        UserDto userDto = userServiceClient.getUserByUsername(username);
        return userDto.getId();
    }
}
