const { pool } = require("../config/db");

const processAccessRequest = async ({
  student_id,
  full_name,
  email,
}) => {
  try {

    // ==========================
    // Check Student Registry
    // ==========================
    const [studentRows] = await pool.query(
      "SELECT * FROM student_registry WHERE student_id = ?",
      [student_id]
    );

    if (studentRows.length === 0) {
      return {
        status: "Rejected",
        reason: "Student ID not found in Student Registry.",
      };
    }

    const student = studentRows[0];

    // ==========================
    // Validate Name
    // ==========================
    if (
      student.full_name.trim().toLowerCase() !==
      full_name.trim().toLowerCase()
    ) {
      return {
        status: "Rejected",
        reason: "Student name does not match our records.",
      };
    }

    // ==========================
    // Validate Email
    // ==========================
    if (
      student.email.trim().toLowerCase() !==
      email.trim().toLowerCase()
    ) {
      return {
        status: "Rejected",
        reason: "Email does not match our records.",
      };
    }

    // ==========================
    // Duplicate Approved Check
    // ==========================
    const [existing] = await pool.query(
      "SELECT * FROM program_student WHERE student_id = ? AND status='Approved'",
      [student_id]
    );

    if (existing.length > 0) {
      return {
        status: "Approved",
        reason: "Student already has dashboard access.",
      };
    }

    // ==========================
    // Semester Registration
    // ==========================
    const [registrationRows] = await pool.query(
      "SELECT * FROM semester_registration WHERE student_id = ?",
      [student_id]
    );

    if (
      registrationRows.length === 0 ||
      registrationRows[0].on_time_registration !== "Yes"
    ) {
      return {
        status: "Pending",
        reason:
          "Semester registration is incomplete. Please complete your registration.",
      };
    }

    // ==========================
    // Approved
    // ==========================
    return {
  status: "Approved",
  reason: "Congratulations! Your dashboard access has been approved.",
  campus: student.campus,
};

  } catch (err) {
    console.error(err);

    return {
      status: "Rejected",
      reason: "Unexpected server error.",
    };
  }
};

module.exports = {
  processAccessRequest,
};