package org.b2b_system.user.service;

import org.b2b_system.user.dto.UserRequest;
import org.b2b_system.user.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserService {

    UserResponse createUser(UserRequest request);
    UserResponse getUserByUserId(UUID id);
    Page<UserResponse> getAllUsers(Pageable pageRequest, String userType);
}
