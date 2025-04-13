package ru.shtanko.projectservice.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private BigDecimal goalAmount;

    private LocalDate deadline;

    private String esgFactors;

    private String status = "ACTIVE";

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    private Long authorId;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Transaction> transactions = new ArrayList<>();

    private BigDecimal collectedAmount = BigDecimal.ZERO;
}
