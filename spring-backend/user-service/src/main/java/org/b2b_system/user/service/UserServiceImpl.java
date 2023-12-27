package org.b2b_system.user.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.user.dto.UserRequest;
import org.b2b_system.user.dto.UserResponse;
import org.b2b_system.user.model.User;
import org.b2b_system.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    public UserResponse createUser(UserRequest request) {
        logger.info("Add new User to the database");
        return mapUserToResponse(userRepository.save(mapUserRequestToUser(request)));
    }

    public UserResponse getUserByUserId(UUID id) {
        return userRepository.findByUserId(id).map(this::mapUserToResponse)
                .orElseThrow(() -> new EntityNotFoundException(
                        "User with id - %s does not exist".formatted(id)));
    }

    public Page<UserResponse> getAllUsers(Pageable pageRequest, String userType) {
        return userRepository
                .findUserMatch(userType, pageRequest)
                .map(this::mapUserToResponse);
    }


    public User mapUserRequestToUser(UserRequest request) {
        return User.builder()
                .name(request.getName())
                .userId(request.getUserId())
                .email(request.getEmail())
                .userRole(request.getRole())
                .address(request.getAddress())
                .build();
    }

    public UserResponse mapUserToResponse(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .type(user.getUserRole())
                .address(user.getAddress())
                .build();
    }
}
