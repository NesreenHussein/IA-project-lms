import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import { CourseDetails } from "../database";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  return (
    <div>
      <Form style={{ width: " 500%" }} className="container">
        <div className="heading">{/* <h1>DELETE</h1> */}</div>
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm={6}>
            <h6>ID</h6>
          </Form.Label> */}
          {/* <Col sm={10}>
            <Form.Control type="text" placeholder="Course ID" />
          </Col> */}
        </Form.Group>
        <br></br>
        <div className="mb-2">
          {/* <Button variant="primary" size="lg">
            Submit
          </Button>

          <br />
          <br />
          <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
            Cancel
          </Button> */}

          <br />
          <br />

          <Button variant="primary" onClick={() => navigate("/manageCourse")}>
            Add
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
  const [instructor, setInstructor] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setInstructor({ ...instructor, loading: true });
    console.log("!!!!!!!!!!!!!!!!!!!!!!!");
    axios
      .get("http://localhost:4000/admin/listCourse")

      .then((resp) => {
        console.log(resp);
        console.log("1!!!!!!!!!!!!!!!!!!1");
        setInstructor({
          ...instructor,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setInstructor({
          ...instructor,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [instructor.reload]);

  function deleteUser(id) {
    axios
      .delete(`http://localhost:4000/admin/delete/${id}`, {})
      .then((resp) => {
        setInstructor({ ...instructor, reload: instructor.reload + 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
              <th
                style={{
                  // background: "rgb(255, 0, 0)",
                  color: "black",
                  borderRadius: "10px",
                }}
              >
                action
              </th>
            </tr>
          </thead>
          {instructor.results.map((Instructors, key) => {
            return (
              <tr key={key} style={{ background: "white" }}>
                <td>{Instructors.id}</td>
                <td>{Instructors.name}</td>
                <td>{Instructors.status}</td>
                <td>{Instructors.instructor_id}</td>
                <td>
                  <button
                    style={{
                      background: "rgb(185, 40, 40)",
                      borderRadius: "10px",
                    }}
                    onClick={() => deleteUser(Instructors.id)}
                  >
                    delete
                  </button>
                </td>
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
