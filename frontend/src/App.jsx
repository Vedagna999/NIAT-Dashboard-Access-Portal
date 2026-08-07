import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import StudentPortal from "./pages/StudentPortal";
import StudentLogin from "./pages/StudentLogin";
import RequestAccess from "./pages/RequestAccess";
import StudentResult from "./pages/StudentResult";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import ApprovedStudents from "./pages/ApprovedStudents";
import PendingStudents from "./pages/PendingStudents";
import RejectedStudents from "./pages/RejectedStudents";

function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Student */}
      <Route path="/student" element={<StudentPortal />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/request" element={<RequestAccess />} />
      <Route path="/student/result" element={<StudentResult />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/profile" element={<Profile />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/approved" element={<ApprovedStudents />} />
      <Route path="/admin/pending" element={<PendingStudents />} />
      <Route path="/admin/rejected" element={<RejectedStudents />} />
    </Routes>
  );
}

export default App;