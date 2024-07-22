import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
//import { CourseDetails } from "../database";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";

function RegisterForm() {
  const auth = getAuthUser();

  const navigate = useNavigate();
  const [courses, setcourses] = useState({
    name: "",
    instructor_id: "",
    results: [],

    // role: "",
    err: [],
    loading: false,
  });
  const assignInstructor = (e) => {
    e.preventDefault();

    setcourses({ ...courses, loading: true, err: [] });

    axios
      .post("http://localhost:4000/admin/AssignInstructor", {
        instructor_id: courses.instructor_id,
        name: courses.name,

        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setcourses({
          ...courses,
          instructor_id: "",
          name: "",
          loading: false,
          err: [],
        });

        console.log(resp.data);
        navigate("/AssigIns");
      }, navigate("/AssigIns"))
      .catch((err) => {
        setcourses({
          ...courses,
          loading: false,

          err: "Something went wrong, please try again later !",
          // err: response.data.errors,
        });
      });
  };

  return (
    <div>
      <Form
        onSubmit={assignInstructor}
        style={{ width: " 500%" }}
        className="container"
      >
        <div className="heading">
          <h1>Assign</h1>
        </div>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Instructor ID</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={courses.instructor_id}
              onChange={(e) => {
                setcourses({ ...courses, instructor_id: e.target.value });
              }}
              type="text"
              placeholder="Instructor ID"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Course name</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={courses.name}
              onChange={(e) => {
                setcourses({ ...courses, name: e.target.value });
              }}
              type="text"
              placeholder="Course Name"
            />
          </Col>
        </Form.Group>
        <br></br>
        <div className="mb-2">
          <Button
            className="btn btn-success"
            variant="primary"
            type="submit"
            disabled={courses.loading === true}
            onClick={() => {
              window.location.reload(true);
            }}
          >
            submit
          </Button>

          <br />
          <br />
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>

          <br />
          <br />

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </Form>
    </div>
  );
}
const ShowCourses = () => {
  const [courses, setcourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setcourses({ ...courses, loading: true });
    console.log("!!!!!!!!!!!!!!!!!!!!!!!");
    axios
      .get("http://localhost:4000/admin/listCourse")

      .then((resp) => {
        console.log(resp);
        console.log("1!!!!!!!!!!!!!!!!!!1");
        setcourses({
          ...courses,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setcourses({
          ...courses,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [courses.reload]);

  return (
    <div style={{ background: "lightgray" }}>
      <div className="container">
        <br />
        <h1>Show Courses</h1>
        <br />
        <Table striped bordered hover size="lg">
          <thead style={{ background: "rgb(134, 212, 245)" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Instructor</th>
            </tr>
          </thead>
          {courses.results.map((Course, key) => {
            return (
              <tr key={key} style={{ background: "white" }}>
                <td>{Course.id}</td>
                <td>{Course.name}</td>
                <td>{Course.status}</td>
                <td>{Course.instructor_id}</td>
              </tr>
            );
          })}
          <br />
          <RegisterForm> </RegisterForm>
          <br />
          <br />
          <br />
          <br />
          <br />
        </Table>
      </div>
    </div>
  );
};

export default ShowCourses;
