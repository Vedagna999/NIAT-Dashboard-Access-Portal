const { pool } = require("../config/db");
const { processAccessRequest } = require("../services/approvalService");

// ==========================================
// Create New Access Request
// ==========================================
const createRequest = async (req, res) => {
  try {
    const { student_id, full_name, email } = req.body;

    if (!student_id || !full_name || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Process approval logic
    const result = await processAccessRequest({
      student_id,
      full_name,
      email,
    });

    const requestId = `REQ${Date.now()}`;

    // Store Access Request
    await pool.query(
      `INSERT INTO access_request
      (request_id, student_id, full_name, email, submitted_on, request_status, reason)
      VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
      [
        requestId,
        student_id,
        full_name,
        email,
        result.status,
        result.reason,
      ]
    );

    // Insert into Program Student if Approved/Pending
    if (result.status !== "Rejected") {
      const [exists] = await pool.query(
        "SELECT * FROM program_student WHERE student_id = ?",
        [student_id]
      );

      if (exists.length === 0) {
        await pool.query(
  `INSERT INTO program_student
  (student_id, full_name, email, campus, status, program_enrollment_date)
  VALUES (?, ?, ?, ?, ?, NOW())`,
  [
    student_id,
    full_name,
    email,
    result.campus,
    result.status,
  ]
);
      }
    }

    res.json({
      success: true,
      status: result.status,
      reason: result.reason,
      message: "Access request processed successfully.",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// Dashboard Statistics
// ==========================================
const getDashboardStats = async (req, res) => {
  try {

    const [[total]] = await pool.query(
      "SELECT COUNT(*) AS total FROM access_request"
    );

    const [[approved]] = await pool.query(
      "SELECT COUNT(*) AS approved FROM program_student WHERE status='Approved'"
    );

    const [[pending]] = await pool.query(
      "SELECT COUNT(*) AS pending FROM program_student WHERE status='Pending'"
    );

    const [[rejected]] = await pool.query(
      "SELECT COUNT(*) AS rejected FROM access_request WHERE request_status='Rejected'"
    );

    res.json({
      success: true,
      total: total.total,
      approved: approved.approved,
      pending: pending.pending,
      rejected: rejected.rejected,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// Approved Students
// ==========================================
const getApprovedStudents = async (req, res) => {
  try {

    const [rows] = await pool.query(
      "SELECT * FROM program_student WHERE status='Approved'"
    );

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ==========================================
// Pending Students
// ==========================================
const getPendingStudents = async (req, res) => {
  try {

    const [rows] = await pool.query(
      "SELECT * FROM program_student WHERE status='Pending'"
    );

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ==========================================
// Rejected Requests
// ==========================================
const getRejectedRequests = async (req, res) => {
  try {

    const [rows] = await pool.query(
      "SELECT * FROM access_request WHERE request_status='Rejected'"
    );

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ==========================================
// Student Login
// ==========================================
const studentLogin = async (req, res) => {
  try {

    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM program_student WHERE student_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.json({
      success: true,
      student: rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ==========================================
// Recent Requests
// ==========================================
const getRecentRequests = async (req, res) => {
  try {

    const [rows] = await pool.query(
      `SELECT * FROM access_request
       ORDER BY submitted_on DESC
       LIMIT 10`
    );

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = {
  createRequest,
  getDashboardStats,
  getApprovedStudents,
  getPendingStudents,
  getRejectedRequests,
  studentLogin,
  getRecentRequests,
};