import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import SingleParty from "./singleParty";

import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";
function Party(props) {
  const [show, setShow] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [id, setId] = useState("");
  const history = useHistory();
  const [parties, setParties] = useState([]);
  const { firstName, lastName } =
    (props.location && props.location.state) || {};
  const [search, setSearch] = useState("");

  const firstNameVariable = { firstName };
  const lastNameVariable = { lastName };

  const getParties = async () => {
    console.log("getting posts");
    try {
      const parties = await fetch("/party/parties").then((res) => res.json());
      console.log("got posts", parties);
      setParties(parties);
    } catch (err) {
      console.log("error ", err);
    }
  };

  useEffect(() => {
    getParties();
  }, []); // Only run the first time

  const renderParties = () => {
    return parties
      .filter((p) => p.name && p.name.startsWith(search))
      .map((p) => (
        <div className="card-deck">
          <Card style={{ width: "20rem", margin: "2rem" }} key={p._id}>
            <CardImg
              top
              width="100%"
              src={p.image}
              className="card-img-top"
              alt="party image"
            />

            <CardBody>
              <CardTitle>
                <strong>
                  <h5>{p.name}</h5>
                </strong>
              </CardTitle>

              <CardSubtitle>
                <span className="btn btn-outline-info">Cost ${p.cost}</span>
              </CardSubtitle>

              <CardText>{p.dest}</CardText>
              <CardText>{p.loc}</CardText>

              <Button
                color="success"
                className="btn btn-primary mr-1"
                href={p.web}
              >
                Party here !
              </Button>
              <Button
                className="btn btn-secondary mr-1"
                onClick={() => {
                  setShowComments(true);
                  setShow(false);
                  setShowUser(false);
                  setId(p._id);
                  console.log("id", id);
                }}
              >
                Comments{" "}
                <span className="badge badge-light">
                  {p.commentList.length}
                </span>
              </Button>
            </CardBody>

            <CardFooter className="text-muted">
              Created by {p.authorLastName}, {p.authorFirstName}
            </CardFooter>
          </Card>
        </div>
      ));
  };

  // && p.authorLastName && p.authorFirstName === (lastNameVariable.lastName)
  const renderUserParties = () => {
    return parties
      .filter(
        (p) =>
          p.authorFirstName &&
          p.authorFirstName === firstNameVariable.firstName &&
          p.authorLastName &&
          p.authorLastName === lastNameVariable.lastName
      )
      .map((p) => (
        <div className="card-deck">
          <Card style={{ width: "20rem", margin: "2rem" }} key={p._id}>
            <CardImg
              top
              width="100%"
              src={p.image}
              className="card-img-top"
              alt="party image"
            />

            <CardBody>
              <CardTitle>
                <strong>
                  <h5>{p.name}</h5>
                </strong>
              </CardTitle>

              <CardSubtitle>
                <span className="btn btn-outline-info">Cost ${p.cost}</span>
              </CardSubtitle>

              <CardText>{p.dest}</CardText>

              <Button
                color="success"
                className="btn btn-primary mr-1"
                href={p.web}
              >
                Party here !
              </Button>
              <Button
                className="btn btn-secondary mr-1"
                onClick={() => {
                  setShowComments(true);
                  setShow(false);
                  setShowUser(false);
                  setId(p._id);

                  console.log("id", id);
                }}
              >
                Comments{" "}
                <span className="badge badge-light">
                  {p.commentList.length}
                </span>
              </Button>
            </CardBody>

            <CardFooter className="text-muted">
              Create by {p.authorLastName}, {p.authorFirstName}
            </CardFooter>
          </Card>
        </div>
      ));
  };

  //   const renderParties = () => {

  return (
    <div className="container">
      <nav className="navbar  navbar-dark bg-dark">
        <div className="container">
          <button
            // className="navbar-brand"
            type="button"
            className="navbar-brand btn btn-outline-info"
            onClick={() => history.push("/newVenue")}
          >
            <h4>
              {" "}
              Click here to share &nbsp;
              <span className="badge badge-info">New Party Places !</span>
            </h4>
          </button>

          <form className="form-inline my-2 my-lg-0">
            <label>
              <h5 style={{ color: "white", fontWeight: "bold" }}>
                Search here&nbsp;{" "}
              </h5>
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Halloween"
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
              ></input>
            </label>
          </form>
        </div>
      </nav>
      <br />
      <div>
        <div class="row">
          <h6>
            Please enjoy finding your next party. Click on User HomePage to find
            the parties you have listed. Select Main Page to see all the
            parties. In the upper left you can add a new party by clicking on
            the button. If your looking for a specific place, please use the
            Search bar in the upper right. Finally, feel free to share your
            opinions on these party places if you have been to them by clicking
            the comment button on any of the places.
          </h6>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-info mr-2"
        onClick={(evt) => {
          evt.preventDefault();
          setShow(false);
          setShowUser(true);
          setShowComments(false);
        }}
      >
        <h4>
          <span className="badge badge-info">User HomePage</span>
        </h4>
      </button>

      <button
        type="button"
        className="btn btn-info mr-2"
        onClick={(evt) => {
          evt.preventDefault();
          setShow(true);
          setShowUser(false);
          setShowComments(false);
        }}
      >
        <h4>
          <span className="badge badge-info">Main Page</span>
        </h4>
      </button>

      {show ? <div className="row">{renderParties()}</div> : ""}

      {showUser ? (
        <div>
          <h3
            style={{
              color: "black",

              fontFamily: "Georgia",
              fontWeight: "bold",
            }}
          >
            Welcome {firstName} {lastName}
          </h3>

          <div className="row">{renderUserParties()}</div>
        </div>
      ) : (
        ""
      )}

      {showComments ? <SingleParty id={id}></SingleParty> : ""}
    </div>
  );
}

export default Party;
