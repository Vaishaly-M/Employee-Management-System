package com.example.employee_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.example.employee_backend.dto.EmployeeDto.EmployeeRequest;
import com.example.employee_backend.dto.EmployeeDto.EmployeeResponse;
import com.example.employee_backend.dto.EmployeeDto.EmployeeSearchDTO;
import com.example.employee_backend.dto.EmployeeDto.PagedEmployeeResponse;
import com.example.employee_backend.entity.Employee;
import com.example.employee_backend.exception.ResourceAlreadyExistsException;
import com.example.employee_backend.exception.ResourceNotFoundException;
import com.example.employee_backend.mapper.EmployeeMapper;
import com.example.employee_backend.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }

    @Transactional
    public EmployeeResponse createEmployee(EmployeeRequest employeeRequest) {
        if (employeeRepository.existsByEmail(employeeRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("Employee with email " + employeeRequest.getEmail() + " already exists");
        }

        Employee employee = employeeMapper.toEntity(employeeRequest);
        Employee savedEmployee = employeeRepository.save(employee);
        return employeeMapper.toDto(savedEmployee);
    }

    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return employeeMapper.toDto(employee);
    }

    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest employeeRequest) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        if (!employee.getEmail().equals(employeeRequest.getEmail()) &&
                employeeRepository.existsByEmail(employeeRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already in use: " + employeeRequest.getEmail());
        }

        employeeMapper.updateEntityFromDto(employee, employeeRequest);
        Employee updatedEmployee = employeeRepository.save(employee);
        return employeeMapper.toDto(updatedEmployee);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    public Page<EmployeeResponse> getAllEmployeesPaginated(int page, int size, String sortBy, String sortDirection) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<Employee> employeePage = employeeRepository.findAll(pageable);
        return employeePage.map(employeeMapper::toDto);
    }

    public Page<EmployeeResponse> searchEmployees(EmployeeSearchDTO searchDTO) {
        Sort.Direction direction = searchDTO.getSortDirection().equalsIgnoreCase("desc") ?
                Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(
                searchDTO.getPage(),
                searchDTO.getSize(),
                Sort.by(direction, searchDTO.getSortBy())
        );

        Page<Employee> employeePage;

        if (searchDTO.getName() != null && !searchDTO.getName().isEmpty() &&
                searchDTO.getDepartment() != null && !searchDTO.getDepartment().isEmpty()) {
            employeePage = employeeRepository.findByNameAndDepartmentContainingIgnoreCase(
                    searchDTO.getName(), searchDTO.getDepartment(), pageable);
        } else if (searchDTO.getName() != null && !searchDTO.getName().isEmpty()) {
            employeePage = employeeRepository.findByNameContainingIgnoreCase(searchDTO.getName(), pageable);
        } else if (searchDTO.getDepartment() != null && !searchDTO.getDepartment().isEmpty()) {
            employeePage = employeeRepository.findByDepartmentContainingIgnoreCase(searchDTO.getDepartment(), pageable);
        } else {
            employeePage = employeeRepository.findAll(pageable);
        }

        return employeePage.map(employeeMapper::toDto);
    }
}
