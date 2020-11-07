import React from "react";
import { useHistory } from "react-router-dom";
function Landing() {
  const history = useHistory();
  return (
    <div className="container">
      <div className="container2">
        <img
          src="https://static.toiimg.com/photo/67284007/new-year-party.jpg? width: 100%;"
          className="img-fluid"
          alt="hompage"
        />
      </div>
      <br />

      <div className="row"></div>
      <strong>
        <h1
          className="display-5"
          style={{
            color: "black",
            fontWeight: "bold",
            fontFamily: "Georgia",
          }}
        >
          Log in to find a party
        </h1>
      </strong>
      <br />
      <button
        type="button"
        className="btn btn-info"
        onClick={() => history.push("/login")}
      >
        Log in & Register
      </button>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Landing;
