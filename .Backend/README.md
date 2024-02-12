# Mini Project - B2B System and Sales Portal

This is the backend implementation of a B2B Ecommerce application. The application is developed using Spring Boot and
organized as a multi-module project with several microservices.

## Project Structure

###

    b2b-ecommerce-backend
    │
    ├── batch-service (batch process to add bulk orders)
    │ ├── src
    │ └── pom.xml
    │
    ├── cart-service (Microservice for managing carts)
    │ ├── src
    │ └── pom.xml
    │
    ├── product-service (Microservice for managing products)
    │ ├── src
    │ └── pom.xml
    │
    ├── order-service (Microservice for managing orders)
    │ ├── src
    │ └── pom.xml
    │
    └── user-service (Microservice for managing users and authentication)
    ├── src
    └── pom.xml

###

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) (version 8 or later)
- [Maven](https://maven.apache.org/download.cgi)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/b2b-ecommerce-backend.git
    ```

2. Navigate to the project directory:

   ```bash
   cd b2b-ecommerce-backend
   ``` 

3. Build the project:

   ```bash
   mvn clean install
   ```

