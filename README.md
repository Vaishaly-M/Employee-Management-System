# Employee Management API

This project is a RESTful API for managing employee records built using Java Spring Boot as the backend, React for the frontend, and MySQL as the database. The API supports CRUD operations for employee records.

## Features

- Add an employee
- Retrieve an employee by ID
- Retrieve all employees
- Update an employee
- Delete an employee
- Pagination support
- Search employees by name or department 

## Technologies Used

- **Backend**: Java, Spring Boot
- **Frontend**: React
- **Database**: MySQL
- **Tools**: Maven, Node.js, npm/yarn

---

## Environment Setup

### Prerequisites

- **Java**: JDK 11 or higher
- **Spring Boot**: 2.5.0 or higher
- **MySQL**: 5.7 or higher
- **Node.js**: 14.x or higher
- **npm**: 6.x or higher
- **Maven**: 3.x or higher

---

### Backend Setup (Spring Boot)

1. **Clone the repository**

   git clone https://github.com/Vaishaly-M/Employee-Management-System.git


2. **Create a new database for the project**

    CREATE DATABASE employeedb;

3. **Update src/main/resources/application.properties**

spring.datasource.url=jdbc:mysql://localhost:3306/employeedb
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

4. **Build and Run the Backend**

./mvnw spring-boot:run


### Fronend Setup (React)

1. **Clone the repository**

   git clone https://github.com/Vaishaly-M/Employee-Management-System.git


2. **Install Node.js dependencies**
    
    npm install

3. **Update API Endpoint**

    Open src/api.js and update the API URL
    const API_URL = "http://localhost:8080/api/employees";

4. **Run the Frontend**

    npm start

