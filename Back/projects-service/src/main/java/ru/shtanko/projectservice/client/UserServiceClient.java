package ru.shtanko.projectservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ru.shtanko.projectservice.dto.UserDto;

@FeignClient(name = "user-service", configuration = FeignClientConfig.class)
public interface UserServiceClient {

    @GetMapping("/users/{id}")
    UserDto getUserById(@PathVariable Long id);

    @GetMapping("/users/username/{username}")
    UserDto getUserByUsername(@PathVariable String username);
}
