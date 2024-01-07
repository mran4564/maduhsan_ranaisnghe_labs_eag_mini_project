package org.b2b_system.product.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.b2b_system.product.dto.product.ApproveProductRequest;
import org.b2b_system.product.dto.product.ProductRequest;
import org.b2b_system.product.dto.product.ProductResponse;
import org.b2b_system.product.dto.product.UpdateProductRequest;
import org.b2b_system.product.model.ApproveStatus;
import org.b2b_system.product.service.ProductService;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    private ProductRequest productRequest;
    private ProductResponse productResponse;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        productRequest = ProductRequest.builder()
                .name("TestProduct")
                .stockCount(20)
                .build();
        productResponse = ProductResponse.builder()
                .name("TestProduct")
                .stockCount(20)
                .build();
    }

    @Test
    void createProductShouldCreateProductSuccessfully() throws Exception {
        given(productService.createProduct(ArgumentMatchers.any())).willAnswer((invocation -> productResponse));

        ResultActions response = mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(productRequest)));

        response.andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name", CoreMatchers.is(productRequest.getName())))
                .andExpect(MockMvcResultMatchers.jsonPath("$.stockCount",
                        CoreMatchers.is(productRequest.getStockCount())));
    }

    @Test
    void shouldGetAllProducts() throws Exception {
        // Arrange
        Pageable pageRequest = PageRequest.of(0, 10);
        Page<ProductResponse> pageResponse = new PageImpl<>(List.of(), pageRequest, 0);
        given(productService.getAllProducts(any(),any(),any(),any(),any())).willAnswer((invocation -> pageResponse));

        // Act and Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size").value(10)); // Assuming default page size is 10
    }

    @Test
    void shouldGetProductDetails() throws Exception {
        UUID productId = UUID.randomUUID();


        ProductResponse productResponse = ProductResponse.builder()
                .name("UpdatedName")
                .description("UpdatedDescription")
                .stockCount(20)
                .imageUrl("updated/image.jpg")
                .isInStock(true)
                .price(new BigDecimal("39.99"))
                .build();

        given(productService.getProductDetails(any())).willAnswer((invocation -> productResponse));

        // Act and Assert
        mockMvc.perform(get("/api/v1/products/{id}", productId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("UpdatedName"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("UpdatedDescription"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.stockCount").value(20))
                .andExpect(MockMvcResultMatchers.jsonPath("$.inStock").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrl").value("updated/image.jpg"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.price").value(39.99));
    }

    @Test
    void shouldUpdateProductDetails() throws Exception {
        // Arrange
        UUID productId = UUID.randomUUID();
        UpdateProductRequest updateRequest = new UpdateProductRequest("UpdatedName", "UpdatedDescription",
                20, "updated/image.jpg", true, new BigDecimal("39.99"));

        ProductResponse updateProductResponse = ProductResponse.builder()
                .name("UpdatedName")
                .description("UpdatedDescription")
                .stockCount(20)
                .imageUrl("updated/image.jpg")
                .isInStock(true)
                .price(new BigDecimal("39.99"))
                .build();

        given(productService.updateProductDetails(any(), ArgumentMatchers.any())).willAnswer((invocation -> updateProductResponse));

        // Act and Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/products/{id}", productId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("UpdatedName"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("UpdatedDescription"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.stockCount").value(20))
                .andExpect(MockMvcResultMatchers.jsonPath("$.inStock").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrl").value("updated/image.jpg"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.price").value(39.99));
    }

    @Test
    void shouldApproveProductSuccessfully() throws Exception {
        // Arrange
        UUID productId = UUID.randomUUID();
        ApproveProductRequest approveRequest = new ApproveProductRequest(ApproveStatus.APPROVED);
        productResponse.setIsApproved(approveRequest.getApproved());
        given(productService.approveProduct(any(), ArgumentMatchers.any())).willAnswer((invocation -> productResponse));

        // Act and Assert
        mockMvc.perform(MockMvcRequestBuilders.patch("/api/v1/products/{id}", productId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(approveRequest)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.isApproved").value(ApproveStatus.APPROVED.toString()));
    }

    @Test
    void shouldDenyProductApproval() throws Exception {
        // Arrange
        UUID productId = UUID.randomUUID();
        ApproveProductRequest denyRequest = new ApproveProductRequest(ApproveStatus.REJECTED);
        productResponse.setIsApproved(denyRequest.getApproved());
        given(productService.approveProduct(any(), ArgumentMatchers.any())).willAnswer((invocation -> productResponse));

        // Act and Assert
        mockMvc.perform(MockMvcRequestBuilders.patch("/api/v1/products/{id}", productId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(denyRequest)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.isApproved").value(ApproveStatus.REJECTED.toString()));
    }

    @Test
    void shouldDeleteProductSuccessfully() throws Exception {
        // Arrange
        UUID productId = UUID.randomUUID();
        given(productService.deleteProduct(any())).willAnswer((invocation -> "Product deleted successfully"));

        // Act and Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/products/{id}", productId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}