import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../../context/DataRequest";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Swal from "sweetalert2";

export default function Courses() {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { User } = DataRequest();
  const { objectId } = useParams();
  const [courses, setCourses] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [property, setProperty] = useState("");
  const [showCourseForm, setShowCourseForm] = useState(true);
  const [propertyCourse, setPropertyCourse] = useState([]);
  const [description, setDescription] = useState();
  const [courseName, setCourseName] = useState([]);

  const getProperty = useCallback(() => {
    API.get(`/property/${objectId}`).then(({ data }) => {
      setProperty(data);
    });
  }, [objectId]);

  const getPropertyCourse = useCallback(() => {
    API.get("/property-course").then(({ data }) => {
      setPropertyCourse(
        data.filter(
          (propertyCourse) => propertyCourse?.property_id === property?.uniqueId
        )
      );
    });
  }, [property]);

  const getCourse = useCallback(() => {
    API.get("/course").then(({ data }) => {
      setCourses(data);
      const uniqueCourseName = [
        ...new Set(data.map((item) => item.course_name)),
      ];
      setCourseName(uniqueCourseName);
      const uniqueCourseTypes = [
        ...new Set(data.map((item) => item.course_type)),
      ];
      setCourseTypes(uniqueCourseTypes);
    });
  }, []);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  useEffect(() => {
    getPropertyCourse();
    getCourse();
  }, [getCourse, getPropertyCourse]);

  const filteredCourses = courses.filter(
    (course) => course.course_name === selectedCourse
  );

  const [durationValue, setDurationValue] = useState("");
  const [durationType, setDurationType] = useState("");

  useEffect(() => {
    if (filteredCourses.length > 0 && filteredCourses[0].duration) {
      const [value, type] = filteredCourses[0].duration.split(" ");
      setDurationValue(value);
      setDurationType(type);
    }
    setDescription(filteredCourses[0]?.description);
  }, [filteredCourses]);

  const initialValues = {
    userId: User.uniqueId,
    course_id: filteredCourses[0]?.uniqueId,
    course_name: filteredCourses[0]?.course_name || "",
    course_type: filteredCourses[0]?.course_type || "",
    shortName: filteredCourses[0]?.course_short_name || "",
    courseDuration: durationValue || "",
    durationType: durationType || "",
    course_level: filteredCourses[0]?.course_level || "",
    course_price: filteredCourses[0]?.course_price || "",
  };

  const validationSchema = Yup.object({
    course_type: Yup.string().required("Course type is required."),
    course_name: Yup.string().required("Course name is required."),
    shortName: Yup.string().required("Course Short Name is required."),
    courseDuration: Yup.number()
      .typeError("Duration must be a number.")
      .required("Course duration is required.")
      .min(0, "Duration cannot be negative."),
    durationType: Yup.string().required("Duration type is required."),
    course_level: Yup.string().required("Course Level is required."),
    course_price: Yup.string()
      .required("Course price is required.")
      .min(0, "Course Price cannot be negative."),
  });

  const onSubmit = async (values) => {
    try {
      const data = {
        image: filteredCourses[0]?.image,
        course_id: values.course_id,
        userId: values.userId,
        course_name: values.course_name,
        course_type: values.course_type,
        course_short_name: values.shortName,
        duration: `${values.courseDuration} ${values.durationType}`,
        price: values.course_price,
        course_level: values.course_level,
        property_id: property.uniqueId,
        property_name: property.property_name,
        description: description,
      };
      const response = await API.post("/property-course", data);
      setShowCourseForm(true);
      toast.success(response.data.message);
      getPropertyCourse();
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const handleAddCourse = () => {
    setShowCourseForm(!showCourseForm);
  };

  const handleHideCourseForm = () => {
    setShowCourseForm(true);
  };

  const deleteStatus = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleteResponse = await API.delete(`/property-course/${id}`);
          toast.success(deleteResponse.data.message);
          getPropertyCourse();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "S.NO",
      selector: (row) => row.uniqueId,
      sortable: true,
    },
    {
      name: "Course Name",
      selector: (row) => row.course_name,
      sortable: true,
    },
    {
      name: "Course Short Name",
      selector: (row) => row.course_short_name,
      sortable: true,
    },
    {
      name: "Course Type",
      selector: (row) => row.course_type,
      sortable: true,
    },
    {
      name: "Course Level",
      selector: (row) => row.course_level,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => (
        <>
          <button
            data-bs-toggle="tooltip"
            title="View"
            onClick={() =>
              navigate(`/dashboard/view/course/${row.property_name}/${row._id}`)
            }
          >
            <i className="fe fe-eye"></i>
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Edit"
            onClick={() =>
              navigate(`/dashboard/edit/course/${row.property_name}/${row._id}`)
            }
          >
            <i className="fe fe-edit"></i>
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Delete"
            onClick={() => deleteStatus(row.uniqueId)}
          >
            <i className="fe fe-trash-2"></i>
          </button>
        </>
      ),
    },
  ];

  const data = propertyCourse;

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h5>
            <strong>Courses</strong>
          </h5>
        </Card.Header>
        <Card.Body>
          {showCourseForm ? (
            <>
              {courses ? (
                <>
                  <div className="tab-pane " id="tab-61">
                    <span className="widget-users row profiletab  mb-5">
                      <div className="table">
                        <DataTableExtensions {...tableData}>
                          <DataTable
                            columns={columns}
                            data={data}
                            noHeader
                            defaultSortField="id"
                            defaultSortAsc={false}
                            striped
                            center
                            persistTableHead
                            pagination
                            highlightOnHover
                          />
                        </DataTableExtensions>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddCourse()}
                        >
                          Add Course
                        </button>
                      </div>
                    </span>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {courses.length === 0 && (
                <Row>
                  <Col className="d-flex pt-3">
                    <div>
                      <p className="text-danger">
                        No Courses available. Please add a Course to continue.
                      </p>
                    </div>
                    <div className="ms-auto">
                      <Link
                        to={`/dashboard/course/add`}
                        className="btn btn-primary"
                      >
                        Add Course
                      </Link>
                    </div>
                  </Col>
                </Row>
              )}
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="courseName">Course Full Name</label>
                      <select
                        type="select"
                        name="course_name"
                        id="courseName"
                        className="form-control"
                        value={formik.values.course_name}
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSelectedCourse(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">-- Select Course --</option>
                        {courseName.map((course, index) => (
                          <option key={index} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                      {formik.errors.course_name &&
                      formik.touched.course_name ? (
                        <span className="text-danger">
                          {formik.errors.course_name}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="courseType">Course Type</label>
                      <select
                        type="select"
                        name="course_type"
                        id="courseType"
                        className="form-control"
                        value={formik.values.course_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">-- Select Course --</option>
                        {courseTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {formik.errors.course_type &&
                      formik.touched.course_type ? (
                        <span className="text-danger">
                          {formik.errors.course_type}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="shortName">Course Short Name</label>
                      <input
                        className="form-control"
                        id="shortName"
                        placeholder="Course Short Name"
                        name="shortName"
                        value={formik.values.shortName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.shortName && formik.touched.shortName ? (
                        <span className="text-danger">
                          {formik.errors.shortName}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="courseDuration">Duration</label>
                      <div className="d-flex">
                        <input
                          min={0}
                          type="number"
                          placeholder="Course Duration"
                          className="form-control"
                          name="courseDuration"
                          value={formik.values.courseDuration}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <select
                          id="courseDuration"
                          name="durationType"
                          className="form-control ms-3"
                          value={formik.values.durationType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">--Duration Type--</option>
                          {["Days", "Weeks", "Month"].map((duration, index) => (
                            <option
                              key={index}
                              value={duration}
                              selected={duration === formik.values.durationType}
                            >
                              {duration}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formik.errors.courseDuration &&
                      formik.touched.courseDuration ? (
                        <span className="text-danger">
                          {formik.errors.courseDuration}
                        </span>
                      ) : (
                        <span />
                      )}
                      {formik.errors.durationType &&
                      formik.touched.durationType ? (
                        <span className="text-danger">
                          {formik.errors.durationType}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="courseLevel">Course Level</label>
                      <select
                        name="course_level"
                        className="form-control"
                        value={formik.values.course_level}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">--Select Level--</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      {formik.errors.course_level &&
                      formik.touched.course_level ? (
                        <span className="text-danger">
                          {formik.errors.course_level}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="coursePrice">Course Price</label>
                      <input
                        type="number"
                        id="coursePrice"
                        className="form-control"
                        name="course_price"
                        min={1}
                        placeholder="Enter Amount ₹"
                        value={formik.values.course_price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.course_price &&
                      formik.touched.course_price ? (
                        <span className="text-danger">
                          {formik.errors.course_price}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </Col>
                  <Col className="mb-3">
                    <label>Description</label>
                    <Editor
                      apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onChange={() =>
                        setDescription(editorRef.current.getContent())
                      }
                      onBlur={formik.handleBlur}
                      name={"description"}
                      init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      initialValue={description}
                    />
                  </Col>
                </Row>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleHideCourseForm}
                  className="btn btn-danger ms-1"
                >
                  Cancel
                </button>
              </form>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
