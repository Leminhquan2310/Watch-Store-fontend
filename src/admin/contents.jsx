import { Route, Routes } from "react-router-dom";
import Profile from "./profile";
import UserManagement from "./userManagement";

function Contents() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/user" element={<UserManagement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signOut" element={<div>Sign Out</div>} />
      </Routes>
    </div>
  );
}

export default Contents;
