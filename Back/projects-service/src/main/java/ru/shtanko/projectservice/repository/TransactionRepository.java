package ru.shtanko.projectservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.shtanko.projectservice.entity.Transaction;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByProjectId(Long projectId);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.project.id = :projectId AND t.status = 'COMPLETED'")
    Optional<BigDecimal> getTotalCollectedForProject(@Param("projectId") Long projectId);

    List<Transaction> findByUserId(Long userId);
}
