package org.b2b_system.product.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.b2b_system.product.model.ApproveStatus;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApproveProductRequest {
    ApproveStatus approved;
}
