import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import PropertyImages from "./PropertyImages";
import DataRequest from "../../../context/DataRequest";

export default function OtherDetails() {
    const dispatch = useDispatch();
    const { User } = DataRequest();
    const { uniqueId } = useParams();
    const [status, setStatus] = useState([]);
    const [category, setCategory] = useState([]);
    const [property, setProperty] = useState("");

    const [formState, setFormState] = useState({
        monday: { open: '', close: '' },
        tuesday: { open: '', close: '' },
        wednesday: { open: '', close: '' },
        thursday: { open: '', close: '' },
        friday: { open: '', close: '' },
        saturday: { open: '', close: '' },
        sunday: { open: '', close: '' },
    });

    useEffect(() => {
        getProperty();
        getCategory();
        getStatus();
    }, [])

    const getProperty = () => {
        dispatch(showLoading());
        API.get(`/property/${uniqueId}`).then(({ data }) => {
            dispatch(hideLoading());
            setProperty(data);
        })
    };

    const getCategory = () => {
        dispatch(showLoading());
        API.get(`/category`).then(({ data }) => {
            dispatch(hideLoading());
            setCategory(data);
        })
    };

    const getStatus = () => {
        dispatch(showLoading());
        API.get(`/status`).then(({ data }) => {
            dispatch(hideLoading());
            setStatus(data);
        })
    };

    {/*Other Information */ }
    const [showCategoryInInput, setShowCategoryInInput] = useState(false);
    const [showStatusInInput, setShowStatusInInput] = useState(false);
    const [showEstDateInInput, setShowEstDateInInput] = useState(false);
    const [showBusinessTimeInInput, setShowBusinessTimeInInput] = useState(false);


    {/*Other Information */ }
    const handleEditCategory = () => {
        setShowCategoryInInput(true)
    };
    const handleUpdateCategory = () => {
        setShowCategoryInInput(false)
    };
    const handleCancelEditCategory = () => {
        setShowCategoryInInput(false)
    };
    const handleEditStatus = () => {
        setShowStatusInInput(true)
    };
    const handleUpdateStatus = () => {
        setShowStatusInInput(false)
    };
    const handleCancelEditStatus = () => {
        setShowStatusInInput(false)
    };
    const handleEditEstDate = () => {
        setShowEstDateInInput(true)
    };
    const handleUpdateEstDate = () => {
        setShowEstDateInInput(false)
    };
    const handleCancelEditEstDate = () => {
        setShowEstDateInInput(false)
    };

    const initialValues = {
        property_name: property.property_name || "",
        category: property.category || "",
        status: property.status || "",
        est_year: property.est_year || "",
    }

    const onSubmit = async (values) => {
        try {
            values = { ...values }
            dispatch(showLoading());
            API.patch(`/property/${uniqueId}`, values).then((response) => {
                dispatch(hideLoading());
                if (response.data.message) {
                    toast.success(response.data.message)
                } else if (response.data.error) {
                    toast.error(response.data.error)
                }
            })
        } catch (err) {
            dispatch(hideLoading());
            toast.error(err.message)
        }
    };

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        onSubmit: onSubmit,
        enableReinitialize: true
    });

    const handleTimeChange = (day, time, value) => {
        setFormState({
            ...formState,
            [day]: { ...formState[day], [time]: value },
        });
    };

    return (
        <>
            <div className="tab-pane profiletab show">
                <div id="profile-log-switch">
                    <Card>
                        <Card.Header>
                            <h5><strong>Other Details</strong></h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <strong>Category :</strong>
                                    {!property.category
                                        ?
                                        <>
                                            <form onSubmit={handleSubmit} className="d-flex">
                                                <select
                                                    name="category"
                                                    id="category"
                                                    className="form-control"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <option value="">--Select Category--</option>
                                                    {category.map((item, key) => (
                                                        <option key={key} value={item.category_name}>{item.category_name}</option>
                                                    ))}
                                                </select>
                                                {/* <span onClick={handleCancelEditCategory} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                                                <button type="submit" className="btn"><i className="fe fe-check text-primary"></i></button>
                                            </form>
                                        </>
                                        :
                                        showCategoryInInput
                                            ?
                                            <>
                                                <form onSubmit={handleSubmit} className="d-flex">
                                                    <select
                                                        name="category"
                                                        id="category"
                                                        className="form-control"
                                                        value={values.category}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        <option value="">--Select Category--</option>
                                                        {category.map((item, key) => (
                                                            <option key={key} value={item.category_name}>{item.category_name}</option>
                                                        ))}
                                                    </select>
                                                    <span onClick={handleCancelEditCategory} className="mx-3 py-2"><i className="fe fe-x"></i></span>
                                                    <button type="submit" className="btn"><i className="fe fe-check text-primary"></i></button>
                                                </form>
                                            </>
                                            :
                                            <>
                                                <>
                                                    <br />
                                                    {property.category}
                                                    <span onClick={() => handleEditCategory()} className="mx-2"><i className="fe fe-edit"></i></span>
                                                </>
                                            </>
                                    }
                                </Col>
                                {User.role === "Admin" || User.role === "Editor"
                                    ?
                                    <>
                                        <Col md={6} className="mb-3">
                                            <strong>Status :</strong>
                                            {!property.status
                                                ?
                                                <>
                                                    <form onSubmit={handleSubmit} className="d-flex">
                                                        <select
                                                            name="status"
                                                            id="status"
                                                            className="form-control"
                                                            value={values.status}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        >
                                                            <option value="">--Select Status--</option>
                                                            {status.map((item, key) => (
                                                                <option key={key} value={item.name}>{item.name}</option>
                                                            ))}
                                                        </select>
                                                        {/* <span onClick={handleCancelEditStatus} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                                                        <button type="submit" className="btn"><i className="fe fe-check text-primary"></i></button>
                                                    </form>
                                                </>
                                                :
                                                showStatusInInput
                                                    ?
                                                    <>
                                                        <form onSubmit={handleSubmit} className="d-flex">
                                                            <select
                                                                name="status"
                                                                id="status"
                                                                className="form-control"
                                                                value={values.status}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            >
                                                                <option value="">--Select Status--</option>
                                                                {status.map((item, key) => (
                                                                    <option key={key} value={item.name}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                            <span onClick={handleCancelEditStatus} className="mx-3 py-2"><i className="fe fe-x"></i></span>
                                                            <button type="submit" className="btn"><i className="fe fe-check text-primary"></i></button>
                                                        </form>
                                                    </>
                                                    :
                                                    <>
                                                        <>
                                                            <br />
                                                            {property.status}
                                                            <span onClick={() => handleEditStatus()} className="mx-2"><i className="fe fe-edit"></i></span>
                                                        </>
                                                    </>
                                            }
                                        </Col>
                                    </>
                                    :
                                    null
                                }
                                <Col md={6}>
                                    <strong>Established Year :</strong>
                                    {!property.est_year
                                        ?
                                        <>
                                            <form onSubmit={handleSubmit} className="d-flex">
                                                <input
                                                    type="number"
                                                    name="est_year"
                                                    className="form-control"
                                                    placeholder="Enter established year..."
                                                    value={values.est_year}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {/* <span onClick={handleCancelEditEstDate} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                                                <button type="submit" className="btn"><i className="fe fe-check text-primary"></i></button>
                                            </form>
                                        </>
                                        :
                                        showEstDateInInput
                                            ?
                                            <>
                                                <form onSubmit={handleSubmit} className="d-flex">
                                                    <input
                                                        type="number"
                                                        name="est_year"
                                                        className="form-control"
                                                        placeholder="Enter established year..."
                                                        value={values.est_year}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <span onClick={handleCancelEditEstDate} className="mx-3 py-2"><i className="fe fe-x"></i></span>
                                                    {/* <span onClick={handleUpdateName} className="mx-3 py-2"><i className="fe fe-check"></i></span> */}
                                                    <button type="submit" className="btn"><i className="fe fe-check text-primary"></i></button>
                                                </form>
                                            </>
                                            :
                                            <>
                                                <>
                                                    <br />
                                                    {property.est_year}
                                                    <span onClick={() => handleEditEstDate()} className="mx-2"><i className="fe fe-edit"></i></span>
                                                </>
                                            </>
                                    }
                                </Col>
                                <Col md={12} className="mt-3">
                                    <strong>Opening Hours :</strong>
                                    {!property.business_time
                                        ?
                                        <>
                                            <form onSubmit={handleSubmit}>
                                                {Object.entries(formState).map(([day, times]) => (
                                                    <div key={day}>
                                                        <div className="mb-1 row">
                                                            <div className="col-md-2">
                                                                <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                                                            </div>
                                                            <div className="col-5">
                                                                <input
                                                                    type="time"
                                                                    className='form-control'
                                                                    name="businessHours"
                                                                    value={times.open}
                                                                    onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-5">
                                                                <input
                                                                    type="time"
                                                                    className='form-control'
                                                                    name="businessHours"
                                                                    value={times.close}
                                                                    onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="submit" className="btn"><i className="fe fe-check text-primary"></i></button>
                                            </form>
                                        </>
                                        :
                                        showBusinessTimeInInput
                                            ?
                                            <>
                                                <form onSubmit={handleSubmit}>
                                                    {Object.entries(formState).map(([day, times]) => (
                                                        <div key={day}>

                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                                                                </div>
                                                                <div className="col-5">
                                                                    <input
                                                                        type="time"
                                                                        className='form-control'
                                                                        name="businessHours"
                                                                        value={times.open}
                                                                        onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="col-5">
                                                                    <input
                                                                        type="time"
                                                                        className='form-control'
                                                                        name="businessHours"
                                                                        value={times.close}
                                                                        onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button type="submit" className="btn"><i className="fe fe-check text-primary"></i></button>
                                                </form>
                                            </>
                                            :
                                            <>
                                                <>
                                                    <br />
                                                    {property.business_time}
                                                    <span onClick={""} className="mx-2"><i className="fe fe-edit"></i></span>
                                                </>
                                            </>
                                    }
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
};