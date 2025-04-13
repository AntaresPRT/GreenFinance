package ru.shtanko.projectservice.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.shtanko.projectservice.client.UserServiceClient;
import ru.shtanko.projectservice.dto.CompanyDto;
import ru.shtanko.projectservice.dto.UserDto;
import ru.shtanko.projectservice.entity.Company;
import ru.shtanko.projectservice.service.CompanyService;

import java.util.List;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;
    private final UserServiceClient userServiceClient;

    @PostMapping
    public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto company,
                                                    @RequestHeader("X-User-Name") String username) {
        CompanyDto companyDto = companyService.createCompany(company, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(companyDto);
    }

    @GetMapping()
    public ResponseEntity<List<CompanyDto>> getCompaniesByAuthor(
            @RequestParam(required = false) Long authorId) {
        List<CompanyDto> companies = companyService.getCompaniesByAuthorId(authorId);
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDto> getCompany(@PathVariable Long id) {
        Company company = companyService.getCompanyById(id);
        UserDto userDto = userServiceClient.getUserById(company.getAuthorId());
        return ResponseEntity.ok(CompanyDto.builder()
                .id(company.getId())
                .name(company.getName())
                .description(company.getDescription())
                .author(userDto)
                .tags(company.getTags())
                .build());
    }
}
