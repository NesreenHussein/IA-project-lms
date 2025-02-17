import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";

function RegisterForm() {
  const auth = getAuthUser();
  const navigate = useNavigate();
  const [courses, setcourses] = useState({
    name: "",
    status: "",
    // role: "",
    err: [],
    loading: false,
  });
  const createcourses = (e) => {
    e.preventDefault();

    setcourses({ ...courses, loading: true, err: [] });

    axios
      .post("http://localhost:4000/admin/create", {
        name: courses.name,
        status: courses.status,
        // role: inst.role,
        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setcourses({
          ...courses,
          name: "",
          status: "",
          loading: false,
          err: [],
        });
        // setAuthUser(resp.data);
        navigate("/manageCourse");
      }, navigate("/manageCourse"))
      .catch((err) => {
        setcourses({
          ...courses,
          loading: false,

          err: "Something went wrong, please try again later !",
          // err: errors.response.data.errors,
        });
      });
  };

  return (
    <div>
      <Form
        onSubmit={createcourses}
        style={{ width: " 500%" }}
        className="container"
      >
        <div className="heading">
          <h1>ADD </h1>
        </div>
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm={6} >
          <h6>ID</h6>
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Course ID" />
        </Col> */}
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Name</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Course Name"
              value={courses.name}
              onChange={(e) => {
                setcourses({ ...courses, name: e.target.value });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Status</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Course Status"
              value={courses.status}
              onChange={(e) => {
                setcourses({ ...courses, status: e.target.value });
              }}
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

          <button
            variant="primary"
            class="btn btn-danger"
            onClick={() => navigate("/Delete_Course")}
          >
            Delete
          </button>
          <br />
          <br />
          <Button variant="primary" onClick={() => navigate("/Update_Course")}>
            Update
          </Button>
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

export default ShowCourses;
