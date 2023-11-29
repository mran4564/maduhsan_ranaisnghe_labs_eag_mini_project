package org.b2b_system.user.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @SequenceGenerator(name = "Product_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Product_SEQ")
    private int id;
    private UUID userId;
    private String name;
    private String email;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private String address;
}
