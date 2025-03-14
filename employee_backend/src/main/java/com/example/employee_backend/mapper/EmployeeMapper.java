package com.example.employee_backend.mapper;


import org.springframework.stereotype.Component;

import com.example.employee_backend.dto.EmployeeDto.EmployeeRequest;
import com.example.employee_backend.dto.EmployeeDto.EmployeeResponse;
import com.example.employee_backend.entity.Employee;

@Component
public class EmployeeMapper {

    public Employee toEntity(EmployeeRequest employeeRequest) {
        Employee employee = new Employee();
        employee.setName(employeeRequest.getName());
        employee.setEmail(employeeRequest.getEmail());
        employee.setDepartment(employeeRequest.getDepartment());
        return employee;
    }

    public Employee updateEntityFromDto(Employee employee, EmployeeRequest employeeRequest) {
        employee.setName(employeeRequest.getName());
        employee.setEmail(employeeRequest.getEmail());
        employee.setDepartment(employeeRequest.getDepartment());
        return employee;
    }

    public EmployeeResponse toDto(Employee employee) {
        return new EmployeeResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getDepartment()
        );
    }
}