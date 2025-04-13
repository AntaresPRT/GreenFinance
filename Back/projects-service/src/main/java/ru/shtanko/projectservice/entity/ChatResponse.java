package ru.shtanko.projectservice.entity;

import lombok.Data;

import java.util.List;

@Data
public class ChatResponse {
    private List<Choice> choices;
}
