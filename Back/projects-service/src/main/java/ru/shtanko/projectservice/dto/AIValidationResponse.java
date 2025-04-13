package ru.shtanko.projectservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AIValidationResponse {
    @JsonProperty("E")
    private ESGScorePart e;

    @JsonProperty("S")
    private ESGScorePart s;

    @JsonProperty("G")
    private ESGScorePart g;

    @JsonProperty("company")
    private CompanyScore company;

    @JsonProperty("total_score")
    private int totalScore;

    @JsonProperty("is_approved")
    private boolean is_approved;

    @Data
    public static class ESGScorePart {
        private int score;
        private String explanation;
    }

    @Data
    public static class CompanyScore {
        private int score;
        private String explanation;
    }
}
