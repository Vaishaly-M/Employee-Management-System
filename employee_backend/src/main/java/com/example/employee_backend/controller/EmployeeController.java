package com.example.employee_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.employee_backend.dto.EmployeeDto.EmployeeRequest;
import com.example.employee_backend.dto.EmployeeDto.EmployeeResponse;
import com.example.employee_backend.dto.EmployeeDto.PagedEmployeeResponse;
import com.example.employee_backend.dto.EmployeeDto.EmployeeSearchDTO;
import com.example.employee_backend.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(@Valid @RequestBody EmployeeRequest employeeRequest) {
        EmployeeResponse createdEmployee = employeeService.createEmployee(employeeRequest);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) {
        EmployeeResponse employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        List<EmployeeResponse> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest employeeRequest) {
        EmployeeResponse updatedEmployee = employeeService.updateEmployee(id, employeeRequest);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/paginated")
    public ResponseEntity<PagedEmployeeResponse> getAllEmployeesPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        Page<EmployeeResponse> employeePage = employeeService.getAllEmployeesPaginated(page, size, sortBy, sortDirection);

        PagedEmployeeResponse response = new PagedEmployeeResponse(
                employeePage.getContent(),
                employeePage.getNumber(),
                employeePage.getTotalElements(),
                employeePage.getTotalPages()
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<PagedEmployeeResponse> searchEmployees(@RequestBody EmployeeSearchDTO searchRequest) {
        Page<EmployeeResponse> employeePage = employeeService.searchEmployees(searchRequest);

        PagedEmployeeResponse response = new PagedEmployeeResponse(
                employeePage.getContent(),
                employeePage.getNumber(),
                employeePage.getTotalElements(),
                employeePage.getTotalPages()
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search/name")
    public ResponseEntity<PagedEmployeeResponse> searchByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        EmployeeSearchDTO searchRequest = new EmployeeSearchDTO();
        searchRequest.setName(name);
        searchRequest.setPage(page);
        searchRequest.setSize(size);

        return searchEmployees(searchRequest);
    }

    @GetMapping("/search/department")
    public ResponseEntity<PagedEmployeeResponse> searchByDepartment(
            @RequestParam String department,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        EmployeeSearchDTO searchRequest = new EmployeeSearchDTO();
        searchRequest.setDepartment(department);
        searchRequest.setPage(page);
        searchRequest.setSize(size);

        return searchEmployees(searchRequest);
    }
}
