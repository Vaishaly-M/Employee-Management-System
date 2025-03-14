import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import EmployeePage from "./pages/EmployeePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<EmployeePage />} />
        <Route path="/edit/:id" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
