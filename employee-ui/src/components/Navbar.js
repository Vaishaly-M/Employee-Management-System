import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">Employee Management</Link>
        <div className="d-flex">
          <Link to="/add" className="btn btn-light fw-bold">Add Employee</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
