package org.b2b_system.product.common;


public class Constants {

    public static final String DATABASE_ACCESS_EXCEPTION_MESSAGE = "Error accessing the database";

    public static final String PRODUCT_NAME_AVAILABLE_EXCEPTION_MESSAGE = "product with name %s already available";

    public static final String PRODUCT_NOT_FOUND_EXCEPTION_MESSAGE = "Incorrect product_id or product with Id %s not " +
            "found";

    public static final String CATEGORY_NAME_AVAILABLE_EXCEPTION_MESSAGE = "category with name %s already available";

    public static final String CATEGORY_NOT_FOUND_EXCEPTION_MESSAGE = "Incorrect category_id or - %s does not exist";

    private Constants() {
    }
}
