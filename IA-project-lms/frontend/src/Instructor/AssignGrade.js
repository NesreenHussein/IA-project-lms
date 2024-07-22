import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React from "react";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import axios from "axios";
import { setAuthUser } from "../helper/Storage";
function Alertt() {
  return (
    <div className="alertt text-black">
      {["warning"].map((variant) => (
        <Alert className="text-black" key={variant} variant={variant}>
          Enter the grade of your students
        </Alert>
      ))}
    </div>
  );
}
function Heading() {
  return (
    <>
      <div className="heading">
        <h1>the grade of your students</h1>
      </div>
    </>
  );
}

function AssignGrades() {
  // const header = {
  //   // 'Authorization' : "Bearer " + "c8dcbae90fa60d2a48b3a071a5749528" ,
  //   // "Content=Type" : "application/json"
  //   'token' : 'c8dcbae90fa60d2a48b3a071a5749528'
  // };
  // const token = 'db5e75ed20ce262a43da230cf692a1a5' ;
  // const headers = {
  //     'token': token };
  const [grades, setgrades] = useState({
    grade: "",
    studentID: "",
    courseID: "",
    err: [],
    loading: false,
  });

  const handleRegister = (e) => {
    e.preventDefault();
    setgrades({ ...grades, loading: true, err: [] });
    console.log(grades);
    axios
      .post("http://localhost:4000/instructor/assignGrades", {
        grade: grades.grade,
        studentID: grades.studentID,
        courseID: grades.courseID,
      })
      .then((res) => {
        console.log(res);
        setgrades({ ...grades, loading: false, err: [] });
      })
      .catch((err) => {
        setgrades({ ...grades, loading: false, err: "No grades available" });
      });
  };

  return (
    <div style={{ backgroundImage: `url("e-learning.jpg")` }}>
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
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label column sm={2}>
            <h5>Student ID</h5>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Student ID"
              value={grades.studentID}
              onChange={(e) =>
                setgrades({ ...grades, studentID: e.target.value })
              }
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            <h5>Course ID</h5>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Course ID"
              value={grades.courseID}
              onChange={(e) =>
                setgrades({ ...grades, courseID: e.target.value })
              }
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label column sm={2}>
            <h5>Grade </h5>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="grade"
              value={grades.grade}
              onChange={(e) => setgrades({ ...grades, grade: e.target.value })}
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
          <Button variant="secondary" size="lg">
            Cancel
          </Button>
          <div className=" p-5"></div>
        </div>
      </Form>
    </div>
  );
}
export default AssignGrades;
