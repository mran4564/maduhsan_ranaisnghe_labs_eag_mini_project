package org.b2b_system.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.b2b_system.user.dto.UserRequest;
import org.b2b_system.user.dto.UserResponse;
import org.b2b_system.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping()
    public ResponseEntity<UserResponse> createUser(@RequestBody @Valid UserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @GetMapping
    public ResponseEntity<Page<UserResponse>> getAll(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "user_type", required = false) String userType
    ) {
        Pageable pageRequest = PageRequest.of(page, size);
        return new ResponseEntity<>(userService.getAllUsers(pageRequest, userType), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserDetails(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(userService.getUserByUserId(id));
    }

}
