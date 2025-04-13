package ru.shtanko.projectservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AIValidationResult {
    @JsonProperty("totalScore")
    private int totalScore;

    @JsonProperty("annotation")
    private String annotation;
}
