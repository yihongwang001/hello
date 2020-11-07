import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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

function SingleParty(props) {
  const [parties, setParties] = useState([]);

  const { register, handleSubmit } = useForm();
  const getParties = async () => {
    try {
      const parties = await fetch("/party/parties").then((res) => res.json());

      setParties(parties);
    } catch (err) {
      console.log("error ", err);
    }
  };
  // hello
  useEffect(() => {
    getParties();
  }, []); // Only run the first time

  const renderUserParties = () => {
    return parties
      .filter((p) => p._id && p._id === props.id)
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

              <Button color="success" href={p.web}>
                Party here !
              </Button>
            </CardBody>

            <CardFooter className="text-muted">
              Created by {p.authorLastName}, {p.authorFirstName}
            </CardFooter>
          </Card>
        </div>
      ));
  };

  function seeComments() {
    console.log("commentsection");
    return parties
      .filter((p) => p._id && p._id === props.id)
      .map((p) => (
        <div
          className="media-body p-2 shadow-sm rounded bg-light border"
          key={p._id}
        >
          {p.commentList.map((commentNum) => (
            <div>
              <h6 className="mt-0 mb-1 text-muted">
                {commentNum.firstName}, {commentNum.lastName}
              </h6>
              {commentNum.comment}
            </div>
          ))}
        </div>
      ));
  }

  async function postComment(data) {
    // Default options are marked with *
    await fetch("/party/comment", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  }

  const onSubmit = async (data) => {
    data["_id"] = props.id;
    postComment(data);
  };

  return (
    <div className="row">
      <div className="col-8">
        {renderUserParties()}
        {seeComments()}
      </div>
      <div className="col-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Leave a comment</h1>

          <label>First Name</label>
          <br />
          <input type="text" name="authorFirstName" ref={register} />
          <br />
          <label>Last Name</label>
          <br />
          <input type="text" name="authorLastName" ref={register} />
          <br />
          <label>Comment</label>
          <br />
          <input type="text" name="comment" ref={register} />

          <br />
          <br />
          <input className="btn btn-success" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default SingleParty;
