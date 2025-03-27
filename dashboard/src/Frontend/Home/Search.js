import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  FormGroup,
  InputGroup,
  FormControl,
  Form,
  Col,
} from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../../context/Api.js";

export default function Search() {
  const [category, setCategory] = useState([]);
  const [property, setProperty] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const cityParam = searchParams.get("city");

  useEffect(() => {
    getCategory();
    getProperty();
  }, []);

  const getCategory = () => {
    API.get("/category").then(({ data }) => {
      setCategory(data);
    });
  };

  const getProperty = () => {
    API.get("/property").then(({ data }) => {
      setProperty(data);
      setFilterData(data);
    });
  };

  useEffect(() => {
    const result = property.filter((property) => {
      return property.property_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search]);

  const onChangeCategory = (e) => {
    if (e.target.checked === true) {
      setFilterData(
        property.filter((property) => property.category === e.target.value)
      );
    } else if (e.target.checked === false) {
      setFilterData(property);
    }
  };

  const allCategories = (e) => {
    if (e.target.checked === true) {
      setFilterData(property);
    } else if (e.target.checked === false) {
      setFilterData(property);
    }
  };

  const onChangeCity = (e) => {
    if (e.target.checked === true) {
      setFilterData(
        property.filter((property) => property.property_city === e.target.value)
      );
      // setSearchParams({ city: e.target.value })
    } else if (e.target.checked === false) {
      setFilterData(property);
    }
  };

  const onChangeState = (e) => {
    if (e.target.checked === true) {
      setFilterData(
        property.filter(
          (property) => property.property_state === e.target.value
        )
      );
      // setSearchParams({ state: e.target.value })
    } else if (e.target.checked === false) {
      setFilterData(property);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <Row className="row-cards">
          <Col xl={3} lg={4}>
            <Row>
              <Col md={12} lg={12}>
                <Card>
                  <Card.Header>
                    <Card.Title> Categories &amp; Fliters</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        onChange={allCategories}
                        id="allCategories"
                      />
                      <label class="form-check-label" htmlFor="allCategories">
                        All
                      </label>
                    </div>
                    {category.map((items, key) => (
                      // <div className="custom-checkbox custom-control" key={key}>
                      //     <input
                      //         type="checkbox"
                      //         className="custom-control-input"
                      //         id={`category-${items.uniqueId}`}
                      //         value={items.category_name}
                      //         onChange={onChangeCategory}
                      //     />
                      //     <label htmlFor={`category-${items.uniqueId}`} className="custom-control-label">
                      //         {items.category_name}
                      //     </label>
                      // </div>
                      <>
                        <div class="form-check" key={key}>
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id={`category-${items.uniqueId}`}
                            value={items.category_name}
                            onChange={onChangeCategory}
                          />
                          <label
                            class="form-check-label"
                            htmlFor={`category-${items.uniqueId}`}
                          >
                            {items.category_name}
                          </label>
                        </div>
                      </>
                    ))}
                    <FormGroup>
                      <Form.Label className="form-label">City</Form.Label>
                      {property.map((items, key) => (
                        <div
                          className="custom-checkbox custom-control"
                          key={key}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`city-${items.uniqueId}`}
                            value={items.property_city}
                            onChange={onChangeCity}
                          />
                          <label
                            htmlFor={`city-${items.uniqueId}`}
                            className="custom-control-label"
                          >
                            {items.property_city}
                          </label>
                        </div>
                      ))}
                      {/* <shop.Brand /> */}
                    </FormGroup>
                    <FormGroup>
                      <Form.Label className="form-label">State</Form.Label>
                      {property.map((items, key) => (
                        <div
                          className="custom-checkbox custom-control"
                          key={key}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`state-${items.uniqueId}`}
                            value={items.property_state}
                            onChange={onChangeState}
                          />
                          <label
                            htmlFor={`state-${items.uniqueId}`}
                            className="custom-control-label"
                          >
                            {items.property_state}
                          </label>
                        </div>
                      ))}
                    </FormGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xl={9} lg={8}>
            <Card>
              <Row className="card-body p-2">
                <Col sm={12} className="p-0">
                  <InputGroup>
                    <FormControl
                      type="search"
                      className="form-control"
                      placeholder="Search ..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Card>
            {/* Data */}
            <Row>
              {filterData.map((items, k) => (
                <div className="col-md-6 col-xl-4" key={k}>
                  <div className="card item-card">
                    <div className="ribbone">
                      <div className={`ribbon`}>
                        <span>{items.status}</span>
                      </div>
                    </div>
                    <div className="product-grid6 card-body ">
                      <div className="product-image6 ">
                        <Link to={`/dashboard/view/property/${items.uniqueId}`}>
                          <img
                            src={`${process.env.REACT_APP_MEDIA_URL}/images/${items.logo}`}
                            className="img-fluid"
                            alt=""
                          />
                        </Link>
                        <div className="product-content text-center">
                          {/* <div className="mb-2 text-warning">
                                                        <i className="me-1 fa fa-star"></i>
                                                        <i className={`me-1 fa fa-${playerData.STAR}`}></i>
                                                        <i className={`me-1 fa fa-${playerData.STAR1}`}></i>
                                                        <i className={`me-1 fa fa-${playerData.STAR2}`}></i>
                                                        <i className={`me-1 fa fa-${playerData.STAR3}`}></i>
                                                    </div> */}
                          <h4 className="title">{items.property_name}</h4>
                          <div className="price fs-6">
                            {items.property_city}
                          </div>
                        </div>
                        <ul className="icons">
                          <li>
                            <Link
                              to={`${process.env.PUBLIC_URL}/pages/e-commerce/productDetails/`}
                              data-tip="Quick View"
                            >
                              <i className="fe fe-eye "></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`${process.env.PUBLIC_URL}/pages/e-commerce/wishlist/`}
                              data-tip="Add to Wishlist"
                            >
                              <i className="fa fa-heart-o"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`${process.env.PUBLIC_URL}/pages/e-commerce/shoppingCart/`}
                              data-tip="Add to Cart"
                            >
                              <i className="fa fa-shopping-cart"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
