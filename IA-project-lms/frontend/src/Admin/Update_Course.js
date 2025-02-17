import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
//import { CourseDetails } from "../database";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
function RegisterForm() {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const [courses, setcourses] = useState({
    id: "",
    name: "",
    status: "",
    // role: "",
    err: [],
    loading: false,
  });
  const updateInstructor = (e) => {
    e.preventDefault();

    setcourses({ ...courses, loading: true, err: [] });

    axios
      .put("http://localhost:4000/admin/updateourse", {
        id: courses.id,
        name: courses.name,
        status: courses.status,
        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setcourses({
          ...courses,
          loading: false,
          err: [],
        });
        // setAuthUser(resp.data);
        navigate("/Update_Course");
      }, navigate("/Update_Course"))
      .catch((err) => {
        setcourses({
          ...courses,
          id: "",
          name: "",
          status: "",
          loading: false,

          err: "Something went wrong, please try again later !",
          // err: errors.response.data.errors,
        });
      });
  };

  return (
    <div>
      <Form
        onSubmit={updateInstructor}
        style={{ width: " 500%" }}
        className="container"
      >
        <div className="heading">
          <h1>Update</h1>
          <p>
            NOTE : To update enter the ID and the updated information in it's
            right places
          </p>
        </div>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>ID</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={courses.id}
              onChange={(e) => {
                setcourses({ ...courses, id: e.target.value });
              }}
              type="text"
              placeholder="Course ID"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Name</h6>
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
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Status</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={courses.status}
              onChange={(e) => {
                setcourses({ ...courses, status: e.target.value });
              }}
              type="text"
              placeholder="Course Status"
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
            update
          </Button>

          <br />
          <br />
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>

          <br />
          <br />

          <button
            variant="primary"
            class="btn btn-danger"
            onClick={() => navigate("/Delete_Course")}
          >
            Delete
          </button>
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
const Update_Course = () => {
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
  }, []);

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

export default Update_Course;
