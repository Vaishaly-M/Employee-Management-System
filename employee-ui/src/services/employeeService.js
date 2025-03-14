import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/employees";

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return { data: response.data };
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(API_BASE_URL, employee);
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

export const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with id ${id}:`, error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting employee with id ${id}:`, error);
    throw error;
  }
};

export const getPaginatedEmployees = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/paginate`, {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated employees:", error);
    throw error;
  }
};

export const searchEmployeesByDepartment = async (department, page = 0, size = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/department`, {
      params: { department, page, size }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching employees by department:", error);
    throw error;
  }
};

export const searchEmployeesByName = async (name, page = 0, size = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/name`, {
      params: { name, page, size }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching employees by name:", error);
    throw error;
  }
};

// New combined search function to fix missing import issue
export const searchEmployees = async (query, type = 'name', page = 0, size = 10) => {
  if (type === 'name') {
    return searchEmployeesByName(query, page, size);
  } else if (type === 'department') {
    return searchEmployeesByDepartment(query, page, size);
  } else {
    console.error("Invalid search type. Use 'name' or 'department'.");
    throw new Error("Invalid search type. Use 'name' or 'department'.");
  }
};
