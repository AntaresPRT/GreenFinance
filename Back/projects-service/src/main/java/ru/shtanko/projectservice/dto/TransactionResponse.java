package ru.shtanko.projectservice.dto;

import lombok.Builder;
import lombok.Data;
import ru.shtanko.projectservice.entity.TransactionStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class TransactionResponse {
    private Long id;
    private BigDecimal amount;
    private LocalDateTime timestamp;
    private TransactionStatus status;
    private Long projectId;
    private Long userId;
}
