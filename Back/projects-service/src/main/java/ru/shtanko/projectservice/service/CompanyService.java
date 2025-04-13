package ru.shtanko.projectservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.shtanko.projectservice.client.UserServiceClient;
import ru.shtanko.projectservice.dto.CompanyDto;
import ru.shtanko.projectservice.dto.ProjectDto;
import ru.shtanko.projectservice.dto.UserDto;
import ru.shtanko.projectservice.entity.Company;
import ru.shtanko.projectservice.entity.Project;
import ru.shtanko.projectservice.repository.CompanyRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserServiceClient userServiceClient;

    public CompanyDto createCompany(CompanyDto request, String username) {
        Company company = new Company();
        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setTags(request.getTags());
        company.setAuthorId(getUserIdByUsername(username));
        Company saved = companyRepository.save(company);
        request.setId(saved.getId());
        return request;
    }

    private Long getUserIdByUsername(String username) {
        UserDto userDto = userServiceClient.getUserByUsername(username);
        return userDto.getId();
    }

    public List<CompanyDto> getCompaniesByAuthorId(Long authorId) {
        List<CompanyDto> companyDtos = new ArrayList<>();
        if (authorId != null) {
            List<Company> companies = companyRepository.findByAuthorId(authorId);
            for (Company company : companies) {
                CompanyDto companyDto = CompanyDto.builder()
                        .name(company.getName())
                        .id(company.getId())
                        .description(company.getDescription())
                        .author(userServiceClient.getUserById(company.getAuthorId()))
                        .tags(company.getTags())
                        .build();
                companyDtos.add(companyDto);
            }
        }
        return companyDtos;
    }

    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }
}
