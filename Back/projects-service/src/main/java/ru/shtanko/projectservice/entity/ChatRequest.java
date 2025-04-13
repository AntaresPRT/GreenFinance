package ru.shtanko.projectservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ChatRequest {
    private String model;
    private List<Message> messages;
}
