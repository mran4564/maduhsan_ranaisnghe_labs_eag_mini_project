package org.b2b_system.user.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.b2b_system.user.model.UserRole;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    @NotBlank(message = "email is required")
    private String email;
    private UUID userId;
    private String name;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private String address;
}
