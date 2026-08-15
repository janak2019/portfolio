import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BlogDetails from "./pages/BlogDetails";
import SalaryCalculatorPage from "./pages/SalaryCalculatorPage";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/salary-calculator" element={<SalaryCalculatorPage />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route
        path="/blog/:slug"
        element={<BlogDetails />}
      />
    </Routes>

  );
}

export default App;
