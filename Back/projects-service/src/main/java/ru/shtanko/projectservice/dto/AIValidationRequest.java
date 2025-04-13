package ru.shtanko.projectservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AIValidationRequest {
    private ProjectInfo project;
    private CompanyInfo company;
    private UserInfo userInfo;

    @Data
    @AllArgsConstructor
    public static class ProjectInfo {
        private String title;
        private String description;
        private String esgFactors;
    }

    @Data
    @AllArgsConstructor
    public static class CompanyInfo {
        private String name;
        private String description;
    }

    @Data
    @AllArgsConstructor
    public static class UserInfo {
        private String initiatorDescription;
    }
}
