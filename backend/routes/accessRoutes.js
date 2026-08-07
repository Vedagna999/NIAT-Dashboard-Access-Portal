const express = require("express");

const router = express.Router();

const {
  createRequest,
  getDashboardStats,
  getApprovedStudents,
  getPendingStudents,
  getRejectedRequests,
  studentLogin,
  getRecentRequests,
} = require("../controllers/accessController");

// Student
router.post("/request", createRequest);
router.get("/student/:id", studentLogin);

// Admin
router.get("/dashboard", getDashboardStats);
router.get("/approved", getApprovedStudents);
router.get("/pending", getPendingStudents);
router.get("/rejected", getRejectedRequests);
router.get("/recent", getRecentRequests);

module.exports = router;