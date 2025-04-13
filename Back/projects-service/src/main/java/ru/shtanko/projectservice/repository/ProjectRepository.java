package ru.shtanko.projectservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.shtanko.projectservice.entity.Project;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByAuthorId(Long authorId);
    List<Project> findByTitleContainingIgnoreCase(String title);
}
