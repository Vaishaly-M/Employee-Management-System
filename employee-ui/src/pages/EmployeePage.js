import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

const EmployeePage = () => {
  const navigate = useNavigate();
  
  // This function will be passed to EmployeeForm to redirect back to home
  // after a new employee is added or updated
  const handleEmployeeUpdated = () => {
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">Employee Details</h3>
            </div>
            <div className="card-body">
              <EmployeeForm onEmployeeUpdated={handleEmployeeUpdated} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;