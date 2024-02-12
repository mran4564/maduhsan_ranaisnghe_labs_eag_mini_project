package org.b2b_system.product;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ProductServiceApplicationTests {

    private final String activeProfile;

    ProductServiceApplicationTests(@Value("${spring.profiles.active}") String activeProfile) {
        this.activeProfile = activeProfile;
    }

    @Test
    void contextLoads() {
        assertNotNull(activeProfile);
        assertNotEquals("prod", activeProfile);
    }
}
