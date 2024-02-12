package org.b2b_system.product.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.b2b_system.product.dto.category.CategoryRequest;
import org.b2b_system.product.dto.category.CategoryResponse;
import org.b2b_system.product.service.CategoryService;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.UUID;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = CategoryController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService categoryService;

    private CategoryRequest categoryRequest;
    private CategoryResponse categoryResponse;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        categoryRequest = CategoryRequest.builder()
                .name("TestCategory")
                .description("TestDescription")
                .build();
        categoryResponse = CategoryResponse.builder()
                .name("TestCategory")
                .description("TestDescription")
                .build();
    }

    @Test
    void createCategoryShouldCreateProductSuccessfully() throws Exception {
        given(categoryService.createCategory(ArgumentMatchers.any()))
                .willAnswer((invocation -> categoryResponse));

        ResultActions response = mockMvc.perform(post("/api/v1/category")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(categoryRequest)));

        response.andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name",
                        CoreMatchers.is(categoryRequest.getName())));
    }

    @Test
    void shouldGetAllCategories() throws Exception {
        // Arrange
        given(categoryService.getAllCategories()).willAnswer((invocation -> new ArrayList<>()));

        // Act and Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/category")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldUpdateCategoryDetails() throws Exception {
        // Arrange
        UUID categoryId = UUID.randomUUID();
        CategoryRequest request = new CategoryRequest("updatedCategory", "updatedDescription");
        categoryResponse.setName(request.getName());
        categoryResponse.setDescription(request.getDescription());
        when(categoryService.updateCategoryDetails(categoryId, request)).thenReturn(categoryResponse);

        // Act and Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/category/{id}", categoryId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("updatedCategory"));
    }
}