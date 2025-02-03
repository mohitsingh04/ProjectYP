import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import * as rating from "../../../data/Rating/rating";
import user4 from "../../../assets/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";

export default function Reviews() {
  const { uniqueId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    API.get("/review").then(({ data }) => {
      setReviews(data.filter((reviews) => reviews.property_id === uniqueId));
    });
  }, [uniqueId]);

  return (
    <>
      <div className="tab-pane" id="tab-81">
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h5>
                  <strong>Reviews</strong>
                </h5>
              </Card.Header>
              <Card.Body>
                {reviews.map((items, key) => (
                  <div className="tab-pane" id="tab3" key={key}>
                    <div className="media mb-5">
                      <div className=" me-3">
                        <Link to="#">
                          <img
                            className="media-object rounded-circle thumb-sm"
                            alt="64x64"
                            src={user4}
                          />
                        </Link>
                      </div>
                      <div className="media-body">
                        <h5 className="mt-0 mb-0 ">{items.user_name}</h5>
                        <div>
                          <span className="mx-2 float-end">
                            <i className="fe fe-trash"></i>
                          </span>
                          <span className="mx-2 float-end">
                            <i className="fe fe-edit"></i>
                          </span>
                          <div className="text-warning mb-0">
                            {items.review}
                            <i className="me-1 fa fa-star"></i>
                            <i className="me-1 fa fa-star"></i>
                            <i className="me-1 fa fa-star"></i>
                            <i className="me-1 fa fa-star"></i>
                            <i className="me-1 fa fa-star-o"></i>
                          </div>
                          <p className="font-13 text-muted mb-0">
                            {items.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <h5 className="mb-3">
                  <strong>Add a New Question</strong>
                </h5>
                <hr />
                <form onSubmit={() => console.log("hello")}>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Label>Name</Form.Label>
                      <Form.Group className="form-group">
                        <Form.Control
                          type="text"
                          name="question"
                          className="form-control"
                          placeholder="Your Question..."
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Label>Email</Form.Label>
                      <Form.Group className="form-group">
                        <Form.Control
                          type="text"
                          name="question"
                          className="form-control"
                          placeholder="Your Question..."
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Label>Phone</Form.Label>
                      <Form.Group className="form-group">
                        <Form.Control
                          type="text"
                          name="question"
                          className="form-control"
                          placeholder="Your Question..."
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Label>Gender</Form.Label>
                      <Form.Group className="form-group d-flex gap-3">
                        <Form.Check
                          type="radio"
                          label="Male"
                          name="gender"
                          value="male"
                          id="male"
                        />
                        <Form.Check
                          type="radio"
                          label="Female"
                          name="gender"
                          value="female"
                          id="female"
                        />
                        <Form.Check
                          type="radio"
                          label="Others"
                          name="gender"
                          value="others"
                          id="others"
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Rating
                        name="simple-controlled"
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: "0.55" }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label>Review</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Review"
                      />
                    </Form.Group>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Question
                  </button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
