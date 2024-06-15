import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./admin/login";
import Dashboard from "./admin/dashboard";
import Register from "./admin/register";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/dashboard/*" Component={Dashboard} />
        </Routes>
      </div>
    </Router>
  );
}
