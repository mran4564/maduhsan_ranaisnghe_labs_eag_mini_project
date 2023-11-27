package org.b2b_system.user.repository;

import org.b2b_system.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByName(String name);
    Optional<User> findByProductId(UUID id);

}
