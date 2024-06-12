import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./admin/login";
import Dashboard from "./admin/dashboard";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/dashboard/*" Component={Dashboard} />
        </Routes>
      </div>
    </Router>
  );
}
