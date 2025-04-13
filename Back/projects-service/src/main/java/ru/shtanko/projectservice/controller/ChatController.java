package ru.shtanko.projectservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.shtanko.projectservice.dto.AIValidationResult;
import ru.shtanko.projectservice.dto.ProjectRequest;
import ru.shtanko.projectservice.service.OpenRouterService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
@Slf4j
public class ChatController {

    private final OpenRouterService chatService;

    @PostMapping
    public ResponseEntity<AIValidationResult> chat(@RequestBody ProjectRequest projectRequest,
                                       @RequestHeader("X-User-Name") String username) {
        try {
            AIValidationResult response = chatService.validateProject(projectRequest.getProject(),
                    projectRequest.getCompany(), username);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(500).body(new AIValidationResult());
        }
    }
}