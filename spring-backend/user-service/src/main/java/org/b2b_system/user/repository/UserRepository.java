package org.b2b_system.user.repository;

import org.b2b_system.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserId(UUID id);
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM user u WHERE " +
            "(:user_role is null OR u.user_role = :user_role)", nativeQuery = true)
    Page<User> findUserMatch(@Param("user_role") String userType,
                                   Pageable pageable);


}
