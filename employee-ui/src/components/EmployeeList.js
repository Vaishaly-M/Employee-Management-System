import { useEffect, useState } from "react";
import { getAllEmployees, deleteEmployee, searchEmployees } from "../services/employeeService";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const employeesPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setError(null);
    try {
      const response = await getAllEmployees();
      console.log('Fetched employees:', response); // Log response for debugging
      if (response && response.data && Array.isArray(response.data)) {
        setEmployees(response.data);
        setTotalPages(Math.ceil(response.data.length / employeesPerPage));
      } else {
        setEmployees([]);
        setTotalPages(0);
        setError("Received unexpected data format from server.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees. Please try again later.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    if (searchTerm.trim() === "") {
      fetchEmployees();
      return;
    }

    setIsSearching(true);
    try {
      const response = await searchEmployees(searchTerm);
      console.log('Search response:', response); // Log response for debugging

      if (response && response.data && Array.isArray(response.data)) {
        setEmployees(response.data);
        setTotalPages(Math.ceil(response.data.length / employeesPerPage));
        setCurrentPage(1); // Reset to first page when searching
      } else {
        setEmployees([]);
        setTotalPages(0);
        setError("Received unexpected data format from server.");
      }
    } catch (error) {
      console.error("Error searching employees:", error);
      setError("An error occurred while searching. Please try again or use a different search term.");
      setEmployees([]);
      setTotalPages(0);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setError(null);
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      await deleteEmployee(id);
      // Refresh the current view (either all employees or search results)
      if (searchTerm.trim() !== "") {
        handleSearch({ preventDefault: () => {} });
      } else {
        fetchEmployees();
      }
    } catch (error) {
      console.error(`Error deleting employee with id ${id}:`, error);
      setError("Failed to delete employee. Please try again later.");
    }
  };

  // Get current employees for pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee List</h2>
      
      {/* Search Form */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary ms-2" disabled={isSearching}>
              {isSearching ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Search"
              )}
            </button>
            {searchTerm && (
              <button 
                type="button" 
                className="btn btn-secondary ms-2" 
                onClick={handleClearSearch}
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Search Results Info */}
      {searchTerm && !error && (
        <div className="alert alert-info">
          Showing results for "{searchTerm}" - {employees.length} employee(s) found
          <button className="btn-close float-end" onClick={handleClearSearch}></button>
        </div>
      )}

      <table className="table table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td className="text-center">
                  <Link to={`/edit/${emp.id}`} className="btn btn-warning btn-sm mx-2">Edit</Link>
                  <button 
                    onClick={() => handleDelete(emp.id)} 
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                {searchTerm ? "No matching employees found" : "No employees found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {employees.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToPreviousPage}>Previous</button>
            </li>
            
            {[...Array(totalPages).keys()].map(number => (
              <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                <button
                  onClick={() => paginate(number + 1)}
                  className="page-link"
                >
                  {number + 1}
                </button>
              </li>
            ))}
            
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToNextPage}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default EmployeeList;
