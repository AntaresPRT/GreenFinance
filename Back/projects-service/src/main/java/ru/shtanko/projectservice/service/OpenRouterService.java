package ru.shtanko.projectservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import ru.shtanko.projectservice.client.UserServiceClient;
import ru.shtanko.projectservice.dto.AIValidationRequest;
import ru.shtanko.projectservice.dto.AIValidationResult;
import ru.shtanko.projectservice.dto.ProjectDto;
import ru.shtanko.projectservice.dto.UserDto;
import ru.shtanko.projectservice.entity.*;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
@RequiredArgsConstructor
@Slf4j
public class OpenRouterService {

    private final RestTemplate restTemplate;
    @Value("${openrouter.api.url}")
    private String URL;

    @Value("${openrouter.model}")
    private String model;

    @Value("${openrouter.api.key}")
    private String apiKey;

    private final UserServiceClient userServiceClient;

    private final ProjectsService projectsService;

    public String getChatResponse(String userMessage) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        ChatRequest request = new ChatRequest();
        request.setModel(model);
        request.setMessages(List.of(new Message("user", userMessage)));

        HttpEntity<ChatRequest> entity = new HttpEntity<>(request, headers);
        try {
            ResponseEntity<ChatResponse> response = restTemplate.postForEntity(
                    URL,
                    entity,
                    ChatResponse.class
            );

            return response.getBody().getChoices().get(0).getMessage().getContent();
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("API Error: " + e.getResponseBodyAsString());
        }
    }

    public String buildPrompt(AIValidationRequest request) throws JsonProcessingException {
        return String.format(
                """
                        Ты эксперт в области оценки ESG-проектов.\s
                        Оценку проектам ты даешь по 100 балльной шкале.
                        У тебя есть следующие критерии оценки:
                        1. Environment - максимум 20 баллов
                        2. Social - максимум 20 баллов
                        3. Governance - максимум 20 баллов
                        4. Если во входных данных информации о компании нет, тогда сделай оценку на основе деятельности человека, если информация о компании есть, тогда оцени насколько информация, деятельность компании подходит для создание ESG-проекта (найди в интернете информацию, чем занимается компания):\s
                        1. Если нейтральное воздействие на ESG-компоненты - назначай 20 баллов
                        2. Если информации о компании или о человеке нет - назначай 0
                        3. Если негативные воздействия - меньше 20 баллов и тп
                        
                        Ответ выдавай в следующей структуре:
                        1. *итоговое количество баллов*
                        2. Краткая аннотация проекта. Если итоговое количество менее 75 баллов, то тебе нужно указать в аннотации минусы этого проекта (50-60 слов), если больше 75 - указать его достоинства (90-100 слов)
                        Ответь строго в JSON-формате:
                                {
                                    "totalScore": число_баллов,
                                    "annotation": "текст_аннотации"
                                }
                        Входные данные(1.Информация о проекте, 2. Информация о компании(если указана) или информация о инициаторе проекта):
                        %s""",
                new ObjectMapper().writeValueAsString(request)
        );
    }

    public AIValidationResult validateProject(ProjectDto project, Company company, String username) throws JsonProcessingException {
        AIValidationRequest request = new AIValidationRequest();
        request.setProject(new AIValidationRequest.ProjectInfo(project.getTitle(), project.getDescription(), project.getEsgFactors()));
        if(company != null) {
            request.setCompany(new AIValidationRequest.CompanyInfo(company.getName(), company.getDescription()));
        } else {
            UserDto user = userServiceClient.getUserByUsername(username);
            System.out.println(user.getUsername());
            request.setUserInfo(new AIValidationRequest.UserInfo(user.getDescription()));
        }
        System.out.println(request.getUserInfo());
        String prompt = buildPrompt(request);
        String aiResponse = getChatResponse(prompt);
        log.info("AI response received");
        log.info(aiResponse);
        AIValidationResult result = parseAIResponse(aiResponse);
        int totalScore = result.getTotalScore();
        if(totalScore >= 75) {
            projectsService.createProject(project, username);
            log.info("Successfully save project");
        }
        return result;
    }

    public AIValidationResult parseAIResponse(String rawResponse) throws JsonProcessingException {
        String cleanedResponse = rawResponse
                .replaceAll("```json", "")
                .replaceAll("```", "")
                .trim();

        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(cleanedResponse, AIValidationResult.class);
    }

}
