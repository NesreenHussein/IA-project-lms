const router = require("express").Router();
const conn = require("../db/dbConnection");
const instructor = require("../middleware/instructor");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
//------------- list students-----------------
router.get(
  "/list/:id",
  // instructor,
  body("id"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const usersID = await query(
        `SELECT name, studentID FROM users JOIN studentcourse  ON users.id = studentcourse.studentID WHERE studentcourse.courseID = ${req.params.id}`,
        []
      );
      //   const usersName = await query("select name from users where id = ?", [
      //     req.params.id,
      //   ]);
      res.status(200).json(usersID);
    } catch (error) {
      console.log(error);
    }
  }
);

//----------set grades--------------------
router.post(
  "/assignGrades",
  // instructor, // params
  body("courseID"),
  body("grade"),
  body("studentID"),
  // body("StudentID"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      // 2- CHECK IF user EXISTS OR NOT
      const user = await query(
        "select * from studentcourse where studentID = ?",
        [req.body.studentID]
      );
      if (!user[0]) {
        res.status(404).json({ ms: "User not found !" });
      }
      // 2- CHECK IF course EXISTS OR NOT
      const course = await query(
        "select * from studentcourse where courseID = ?",
        [req.body.courseID]
      );
      if (!course[0]) {
        res.status(404).json({ ms: "course not found !" });
      }

      // 3- PREPARE grade OBJECT
      const gradeObj = {
        grade: req.body.grade,
      };

      // 4- ASSIGN COURSE
      await query(
        "update studentcourse set ? where courseID = ? && studentID = ?",
        [gradeObj, req.body.courseID, req.body.studentID]
      );

      res.status(200).json({
        msg: "assign grade successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

module.exports = router;
