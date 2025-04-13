package ru.shtanko.projectservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.shtanko.projectservice.dto.TransactionRequest;
import ru.shtanko.projectservice.dto.TransactionResponse;
import ru.shtanko.projectservice.service.TransactionService;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionResponse createTransaction(@Valid @RequestBody TransactionRequest request,
            @RequestHeader("X-User-Name") String username) {
        return transactionService.createTransaction(request,username);
    }

    @GetMapping("/project")
    public List<TransactionResponse> getProjectTransactions(@RequestParam Long projectId) {
        return transactionService.getTransactionsByProject(projectId);
    }

    @GetMapping("/user")
    public List<TransactionResponse> getUserTransactions(@RequestParam Long userId) {
        return transactionService.getTransactionsByUser(userId);
    }
}
