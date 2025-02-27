import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import DataRequest from "../../context/DataRequest";
import defaultIcon from "../../Images/defaultcategory-compressed.webp";
import defaultFeature from "../../Images/defaultcategoryfeature-compressed.webp";
import Skeleton from "react-loading-skeleton";

export default function ViewCategory() {
  const navigate = useNavigate();
  const { objectId } = useParams();
  const [category, setCategory] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const mainUser = DataRequest();
  const [loading, setLoading] = useState(true);
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  useEffect(() => {
    const getCategory = () => {
      API.get(`/category/${objectId}`).then(({ data }) => {
        setCategory(data);
        setCategoryIcon(data?.category_icon[0]);
        setFeatureImage(data?.featured_image[0]);
        setLoading(false);
      });
    };
    getCategory();
  }, [objectId]);

  const [isExpanded, setIsExpended] = useState(false);
  const toggleReadMore = () => {
    setIsExpended(!isExpanded);
  };

  const hasPermission = authPermissions?.some(
    (item) => item.value === "Read Course"
  );

  if (!hasPermission) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <h2 className="text-danger fw-bold">Access Denied</h2>
        <p>You do not have the required permissions to access this page.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Category</h1>
            {loading ? (
              <Skeleton width={200} />
            ) : (
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/dashboard` }}>
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: `/dashboard/category/` }}
                >
                  Category
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active"
                  aria-current="page"
                >
                  View
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active breadcrumds"
                  aria-current="page"
                >
                  {category.category_name}
                </Breadcrumb.Item>
              </Breadcrumb>
            )}
          </div>
          <div className="ms-auto pageheader-btn">
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              <span>
                <i className="fe fe-arrow-left"></i>&nbsp;
              </span>
              Back
            </button>
          </div>
        </div>

        <Row>
          <Col lg={12} md={12}>
            <Card className="productdesc">
              <Card.Body>
                {!loading ? (
                  <>
                    <div className="text-center">
                      <div className="bg-light-gray p-5">
                        <img
                          className="position-absolute bottom-0 start-0"
                          alt="Product"
                          src={
                            !categoryIcon
                              ? defaultIcon
                              : `http://localhost:5000/${categoryIcon}`
                          }
                          width={100}
                          style={{ margin: "165px 26px" }}
                        />
                        <img
                          alt="Product"
                          src={
                            !featureImage
                              ? defaultFeature
                              : `http://localhost:5000/${featureImage}`
                          }
                          width={200}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="mt-4 mb-4">
                      <p className="float-end">
                        {category.status === "Active" ? (
                          <span className="badge bg-success">
                            {category.status}
                          </span>
                        ) : category.status === "InActive" ? (
                          <span className="badge bg-danger">
                            {category.status}
                          </span>
                        ) : (
                          <span className="badge bg-warning">
                            {category.status}
                          </span>
                        )}
                      </p>
                      <h3>{category.category_name}</h3>
                      {category.description ? (
                        <strong className="fs-6">Description: </strong>
                      ) : (
                        <strong className="fs-6">
                          Description: Not Available
                        </strong>
                      )}

                      {category.description && (
                        <span>
                          {category.description.length >= 1500 ? (
                            <>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: isExpanded
                                    ? category.description
                                    : category.description.substring(0, 1200) +
                                      "...",
                                }}
                              />
                              <button
                                onClick={toggleReadMore}
                                className="text-primary m-0 p-0 text-decoration-underline"
                              >
                                {isExpanded ? "Read Less" : "Read More"}
                              </button>
                            </>
                          ) : (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: category.description,
                              }}
                            />
                          )}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Skeleton height={250} />
                    <Row>
                      <Col md={6}>
                        <Skeleton count={3} height={20} className="my-2" />
                      </Col>
                      <Col md={6}>
                        <Skeleton count={2} height={20} className="my-2" />
                      </Col>
                    </Row>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
