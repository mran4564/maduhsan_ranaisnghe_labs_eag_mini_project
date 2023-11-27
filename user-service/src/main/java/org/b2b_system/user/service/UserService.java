package org.b2b_system.user.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.b2b_system.user.dto.UserRequest;
import org.b2b_system.user.dto.UserResponse;
import org.b2b_system.user.model.User;
import org.b2b_system.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse createUser(UserRequest request) {
       return mapUserToResponse(userRepository.save(mapUserRequestToUser(request)));
    }

    public User mapUserRequestToUser(UserRequest request){
        return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .address(request.getAddress())
                .build();
    }

    public UserResponse mapUserToResponse(User user){
        return UserResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .userId(UUID.randomUUID())
                .address(user.getAddress())
                .build();
    }

    public UserResponse getUserByUserId(UUID id) {
        var user = userRepository.findByProductId(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "User with id - %s does not exist".formatted(id)));

        return  UserResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .address(user.getAddress())
                .build();
    }
}
