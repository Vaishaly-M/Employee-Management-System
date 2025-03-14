package com.example.employee_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EmployeeDto {

    public static class EmployeeRequest {

        @NotBlank(message = "Name is required")
        private String name;

        @NotBlank(message = "Email is required")
        @Email(message = "Email should be valid")
        private String email;

        @NotBlank(message = "Department is required")
        private String department;

        // Default constructor
        public EmployeeRequest() {
        }

        // All-args constructor
        public EmployeeRequest(String name, String email, String department) {
            this.name = name;
            this.email = email;
            this.department = department;
        }

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }
    }

    public static class EmployeeResponse {
        private Long id;
        private String name;
        private String email;
        private String department;

        // Default constructor
        public EmployeeResponse() {
        }

        // All-args constructor
        public EmployeeResponse(Long id, String name, String email, String department) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.department = department;
        }

        // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }
    }
    public static class EmployeeSearchDTO {
        private String name;
        private String department;
        private int page = 0;
        private int size = 10;
        private String sortBy = "id";
        private String sortDirection = "asc";

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDepartment() {
            return department;
        }

        public void setDepartment(String department) {
            this.department = department;
        }

        public int getPage() {
            return page;
        }

        public void setPage(int page) {
            this.page = page;
        }

        public int getSize() {
            return size;
        }

        public void setSize(int size) {
            this.size = size;
        }

        public String getSortBy() {
            return sortBy;
        }

        public void setSortBy(String sortBy) {
            this.sortBy = sortBy;
        }

        public String getSortDirection() {
            return sortDirection;
        }

        public void setSortDirection(String sortDirection) {
            this.sortDirection = sortDirection;
        }
    }

    // Add a new class for paginated response
    public static class PagedEmployeeResponse {
        private Object employees;
        private int currentPage;
        private long totalItems;
        private int totalPages;

        public PagedEmployeeResponse(Object employees, int currentPage, long totalItems, int totalPages) {
            this.employees = employees;
            this.currentPage = currentPage;
            this.totalItems = totalItems;
            this.totalPages = totalPages;
        }

        // Getters
        public Object getEmployees() {
            return employees;
        }

        public int getCurrentPage() {
            return currentPage;
        }

        public long getTotalItems() {
            return totalItems;
        }

        public int getTotalPages() {
            return totalPages;
        }
    }

}