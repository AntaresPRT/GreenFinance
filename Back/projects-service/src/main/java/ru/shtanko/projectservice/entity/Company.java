package ru.shtanko.projectservice.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String tags;
    private Long authorId;
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Project> projects = new ArrayList<>();
}
