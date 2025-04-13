package ru.shtanko.projectservice.service;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.shtanko.projectservice.client.UserServiceClient;
import ru.shtanko.projectservice.dto.TransactionRequest;
import ru.shtanko.projectservice.dto.TransactionResponse;
import ru.shtanko.projectservice.dto.UserDto;
import ru.shtanko.projectservice.entity.Project;
import ru.shtanko.projectservice.entity.Transaction;
import ru.shtanko.projectservice.entity.TransactionStatus;
import ru.shtanko.projectservice.repository.ProjectRepository;
import ru.shtanko.projectservice.repository.TransactionRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final ProjectRepository projectRepository;
    private final UserServiceClient userServiceClient;

    @Transactional
    public TransactionResponse createTransaction(TransactionRequest request, String username) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new BadRequestException("Project not found"));
        UserDto userDto = userServiceClient.getUserByUsername(username);
        log.info("Creating transaction for project {}", project.getId());
        Transaction transaction = new Transaction();
        transaction.setAmount(request.getAmount());
        transaction.setUserId(userDto.getId());
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setProject(project);
        transaction.setStatus(TransactionStatus.COMPLETED);
        Transaction savedTransaction = transactionRepository.save(transaction);
        log.info("Saved transaction {}", savedTransaction.getId());
        updateProjectCollectedAmount(project);
        return mapToResponse(savedTransaction);
    }

    private void updateProjectCollectedAmount(Project project) {
        BigDecimal total = transactionRepository.getTotalCollectedForProject(project.getId())
                .orElse(BigDecimal.ZERO);
        log.info("Total collected for project {}", project.getId());
        project.setCollectedAmount(total);
        projectRepository.save(project);
    }

    public List<TransactionResponse> getTransactionsByProject(Long projectId) {
        List<Transaction> transactions = transactionRepository.findByProjectId(projectId);

        return transactions.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private TransactionResponse mapToResponse(Transaction transaction) {
        return TransactionResponse.builder()
                .id(transaction.getId())
                .amount(transaction.getAmount())
                .timestamp(transaction.getTimestamp())
                .status(transaction.getStatus())
                .projectId(transaction.getProject().getId())
                .userId(transaction.getUserId())
                .build();
    }

    public List<TransactionResponse> getTransactionsByUser(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        return transactions.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
}
