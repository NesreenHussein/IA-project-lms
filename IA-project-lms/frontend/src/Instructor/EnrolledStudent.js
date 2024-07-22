import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Schedule } from "../shared/schedule";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

var id = "";

const Heading = () => {
  return (
    <div className="heading">
      <h2>Your Registered Courses</h2>
    </div>
  );
};

const EnrolledStudents = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: id,
  });
  function getData(val) {
    setData(val.target.value);
    id = val.target.value;

    console.warn(val.target.value);
  }

  console.log("id:" + id);

  const [instructor, setInstructor] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const listG = () => {
    setInstructor({ ...instructor, loading: true });
    console.log("!!!!!!!!!!!!!!!!!!!!!!!");
    axios
      .get(`http://localhost:4000/instructor/list/${id}`, {})

      .then((resp) => {
        console.log(resp);
        console.log("1!!!!!!!!!!!!!!!!!!1");
        setInstructor({
          ...instructor,
          results: resp.data,

          err: null,
        });
      })
      .catch((err) => {
        setInstructor({
          ...instructor,

          err: " something went wrong, please try again later ! ",
        });
      });
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(238,174,202,1) 14%, rgba(148,187,233,1) 42%)",
      }}
    >
      <div className="container bn-3 p-3">
        <Heading />

        <div className=" p-3"></div>

        <>
          <div>
            <Table striped bordered hover size="lg">
              <thead style={{ background: "rgb(134, 212, 245)" }}>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                </tr>
              </thead>

              {instructor.results.map((inst, key) => {
                return (
                  <tr key={key} style={{ background: "white" }}>
                    <td>{inst.studentID}</td>
                    <td>{inst.name}</td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </>

        <div>
          <form
          // onSubmit={listG}
          >
            <h1>COURSE ID:</h1>
            <br></br>
            <input
              style={{ borderRadius: "10px" }}
              type="text"
              onChange={getData}
            ></input>
            <br></br>
            <br></br>
            <Button
              className="btn btn-dark w-100"
              variant="primary"
              // type="submit"
              // disabled={inst.loading === true}
              onClick={listG}
            >
              submit
            </Button>
          </form>
        </div>

        <div className="g-3 p-5">
          <Schedule />
        </div>
        <div></div>
      </div>
    </div>
  );
};
// console.log(id);
console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIi");

export default EnrolledStudents;
