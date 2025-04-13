package ru.shtanko.projectservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.shtanko.projectservice.client.UserServiceClient;
import ru.shtanko.projectservice.dto.ProjectDto;
import ru.shtanko.projectservice.dto.UserDto;
import ru.shtanko.projectservice.entity.Project;
import ru.shtanko.projectservice.service.ProjectsService;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectsController {

    private final ProjectsService projectsService;
    private final UserServiceClient userServiceClient;

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto project,
                                                 @RequestHeader("X-User-Name") String username) {
        ProjectDto createdProject = projectsService.createProject(project, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable Long id) {
        Project project = projectsService.getProjectById(id);
        UserDto userDto = userServiceClient.getUserById(project.getAuthorId());
        return ResponseEntity.ok(ProjectDto.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .author(userDto)
                .createdAt(project.getCreatedAt())
                .goalAmount(project.getGoalAmount())
                .deadline(project.getDeadline())
                .esgFactors(project.getEsgFactors())
                .collectedAmount(project.getCollectedAmount())
                .build());
    }

    @GetMapping()
    public ResponseEntity<List<ProjectDto>> getProjectsByAuthor(
            @RequestParam(required = false) Long authorId) {
        List<ProjectDto> ads = projectsService.getProjectsBy(authorId);
        return ResponseEntity.ok(ads);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        List<ProjectDto> ads = projectsService.getAllProjects();
        return ResponseEntity.ok(ads);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateAd(@PathVariable Long id,
                                            @RequestBody ProjectDto updatedProject,
                                            @RequestHeader("X-User-Name") String username) {
        Project project = projectsService.updateProject(id, updatedProject, username);
        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAd(@PathVariable Long id,
                                         @RequestHeader("X-User-Name") String username) {
        projectsService.deleteProject(id, username);
        return ResponseEntity.noContent().build();
    }
}
