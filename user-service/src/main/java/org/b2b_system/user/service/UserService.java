package org.b2b_system.user.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.user.dto.UserRequest;
import org.b2b_system.user.dto.UserResponse;
import org.b2b_system.user.model.User;
import org.b2b_system.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse createUser(UserRequest request) {
       return mapUserToResponse(userRepository.save(mapUserRequestToUser(request)));
    }

    public Page<UserResponse> getAllUsers(Pageable pageRequest, String userType) {
        return userRepository
                .findUserMatch(userType,pageRequest)
                .map(this::mapUserToResponse);
    }


    public User mapUserRequestToUser(UserRequest request){
        return User.builder()
                .name(request.getName())
                .userId(request.getUserId())
                .email(request.getEmail())
                .userRole(request.getRole())
                .address(request.getAddress())
                .build();
    }

    public UserResponse mapUserToResponse(User user){
        return UserResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .type(user.getUserRole())
                .address(user.getAddress())
                .build();
    }

    public UserResponse getUserByUserId(UUID id) {
        var user = userRepository.findByUserId(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "User with id - %s does not exist".formatted(id)));

        return  UserResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .address(user.getAddress())
                .build();
    }


}
