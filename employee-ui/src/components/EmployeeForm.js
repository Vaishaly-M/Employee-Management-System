import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addEmployee, getEmployeeById, updateEmployee } from "../services/employeeService";

const EmployeeForm = ({ onEmployeeUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({ name: "", email: "", department: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchEmployee = useCallback(async () => {
    if (!isEditMode) return;

    try {
      setLoading(true);
      const response = await getEmployeeById(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
      setErrors({ fetch: "Failed to load employee data. Please try again." });
    } finally {
      setLoading(false);
    }
  }, [id, isEditMode]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.department.trim()) newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      if (isEditMode) {
        await updateEmployee(id, formData);
      } else {
        await addEmployee(formData);
      }

      setSuccessMessage(isEditMode ? "Employee updated successfully!" : "Employee added successfully!");
      setTimeout(() => navigate("/"), 2000);
      if (onEmployeeUpdated) onEmployeeUpdated();
    } catch (error) {
      console.error("Error saving employee:", error);
      setErrors({ submit: "Failed to save employee. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.fetch && <div className="alert alert-danger">{errors.fetch}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="department" className="form-label">Department</label>
        <input
          type="text"
          className={`form-control ${errors.department ? "is-invalid" : ""}`}
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.department && <div className="invalid-feedback">{errors.department}</div>}
      </div>

      {errors.submit && <div className="alert alert-danger mb-3">{errors.submit}</div>}

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              {isEditMode ? "Updating..." : "Saving..."}
            </>
          ) : (
            isEditMode ? "Update Employee" : "Add Employee"
          )}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
