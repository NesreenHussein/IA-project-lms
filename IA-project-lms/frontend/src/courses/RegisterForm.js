import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

function Alertt() {
  return (
    <div className="alertt">
      {["warning"].map((variant) => (
        <Alert key={variant} variant={variant}>
          IMPORTANT! You have permission to register from 10/5/2023 to 6/6/2023
        </Alert>
      ))}
    </div>
  );
}
function Heading() {
  return (
    <div className="heading p-4">
      <h1>Register Your Courses</h1>
    </div>
  );
}
function RegisterForm() {
  const navigate = useNavigate();
  const auth = getAuthUser();

  const [courses, setCourses] = useState({
    studentID: auth.id,
    courseID: "",
    err: [],
    loading: false,
  });

  const handleRegister = (e) => {
    e.preventDefault();
    setCourses({ ...courses, loading: true, err: [] });
    console.log(courses);
    axios
      .post("http://localhost:4000/student/registerCourse", {
        studentID: auth.id,
        courseID: courses.courseID,
        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        setCourses({
          ...courses,
          // studentID: "",
          courseID: "",
        });
        console.log(res);
        setCourses({ ...courses, loading: false, err: [] });
        // setAuthUser(res.data);
        navigate("/register");
      }, navigate("/register"))
      .catch((err) => {
        setCourses({ ...courses, loading: false, err: "No grades available" });
      });
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(238,174,202,1) 21%, rgba(148,187,233,1) 46%)",
      }}
    >
      <Form
        style={{ width: " 50%" }}
        className="container  g-4 p-5"
        onSubmit={handleRegister}
      >
        <Heading />
        <Alertt />
        <Form.Group className="mb-3">
          <Form.Label>
            <h5>Choose Semster</h5>
          </Form.Label>
          <Form.Select>
            <option>select</option>
            <option>Winter 2022</option>
            <option>Fall 2023</option>
            <option>Summer 2022</option>
          </Form.Select>
        </Form.Group>
        {/* <Form.Group as={Row} className="mb-3 ">
          <Form.Label column sm={2}>
            <h5>Student ID</h5>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Student ID"
              value={auth.id}
              onChange={(e) =>
                setCourses({ ...courses, studentID: e.target.value })
              }
              // required
            />
          </Col>
        </Form.Group> */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            <h5>Course ID</h5>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Course ID"
              value={courses.courseID}
              onChange={(e) =>
                setCourses({ ...courses, courseID: e.target.value })
              }
              required
            />
          </Col>
        </Form.Group>
        <div className="mb-2">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Register
          </Button>
          <div className=" p-3"></div>
          <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <div className=" p-5"></div>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
