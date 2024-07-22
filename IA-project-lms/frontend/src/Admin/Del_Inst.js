import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
// import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { CourseDetails } from "../database";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../helper/Storage";
import Alert from "react-bootstrap/Alert";

function RegisterForm() {
  const navigate = useNavigate();
  // const [inst, setinst] = useState({
  //   id: "",
  // });
  // const instFun = (e) => {
  //   e.preventDefault();
  //   console.log(inst);
  //   // setinst({ ...inst, id: inst.id });
  //   axios
  //     .delete("http://localhost:4000/admin/deleteInstructor", {
  //       id: inst.id,
  //     })
  //     .then((resp) => {
  //       // setinst({ ...inst, loading: false, err: [] });
  //       setAuthUser(resp.data);
  //       navigate("/");
  //     })
  //     .catch((errors) => {
  //       console.log(errors);
  //     });
  // };
  return (
    <div>
      {/* {inst.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))} */}
      <Form
        // onSubmit={instFun}
        style={{ width: " 500%" }}
        className="container"
      >
        {/* <div className="heading">
          <h1>DELETE</h1>
        </div> */}
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm={6}>
            <h6>ID</h6>
          </Form.Label> */}
          {/* <Col sm={10}>
            <Form.Control
              // value={inst.id}
              // onChange={(e) => {
              //   setinst({ ...inst, id: e.target.value });
              //   console.log(e.target.value);
              // }}
              type="text"
              placeholder="Instructor ID"
            />
          </Col> */}
        </Form.Group>

        {/* <br></br> */}
        <div className="mb-2">
          {/* <Button
            className="btn btn-dark w-100"
            variant="primary"
            type="submit"
            // disabled={inst.loading === true
            // }
          >
            submit
          </Button>

          <br />
          <br />
          <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
            Cancel
          </Button> */}
          {/* <br />
          <br /> */}
          <Button variant="primary" onClick={() => navigate("/Add_Instructor")}>
            Add and Update
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
const ShowInstructors = () => {
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
      .get("http://localhost:4000/admin/listInstructor")

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
      .delete(`http://localhost:4000/admin/deleteInstructor/${id}`, {})
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
        <h1>Show Instructors</h1>
        <br />
        <Table striped bordered hover size="lg">
          <thead
            style={{ background: "rgb(134, 212, 245)", borderRadius: "10px" }}
          >
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Password</th> */}
              <th>Phone</th>
              <th>Status</th>
              <th
                style={{
                  //   background: "rgb(185, 40, 40)",
                  color: "black",
                  //   borderRadius: "10px",
                }}
              >
                action
              </th>
              {/*
              {/* <th>Token</th>
              <th>Role</th> */}
            </tr>
          </thead>
          {instructor.results.map((Instructors, key) => {
            return (
              <tr key={key} style={{ background: "white" }}>
                <td>{Instructors.id}</td>
                <td>{Instructors.name}</td>
                <td>{Instructors.email}</td>
                <td>{Instructors.phone}</td>
                <td>{Instructors.status}</td>
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
                {/* <td>{val.creditHours}</td>
                <td>{val.title}</td>
                <td>{val.grade}</td> */}
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

export default ShowInstructors;
