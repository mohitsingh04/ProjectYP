import { Fragment } from 'react';
import Pageheader from '../../../layouts/layoutcomponents/Pageheader';
import { Card, Col, Row } from 'react-bootstrap';
import { Basicbar, Categorybar, Grouped, Imagebar, Markerbar, Negativebar, Patternbar, Reversedbar, Stacked100bar, Stackedbar } from '../../../common/Chartfunction';

const Barchart = () => {
    return (
        <Fragment>
            <Pageheader homepage='Apex Bar Charts' activepage='Apex Charts' page='Apex Bar Charts' />

            <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Basic Bar Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-basic">
                                <Basicbar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Grouped Bar Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-group">
                                <Grouped />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Stacked Bar Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-stacked">
                                <Stackedbar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>100% Stacked Bar Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-full">
                                <Stacked100bar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Bar Chart With Negative Values</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-negative">
                                <Negativebar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Bar Chart With Markers</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-markers">
                                <Markerbar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Reversed Bar Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-reversed">
                                <Reversedbar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Bar With Categogry DataLabels</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-categories">
                                <Categorybar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Patterned Bar Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-pattern">
                                <Patternbar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Bar With Image Fill</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="bar-image">
                                <Imagebar />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Barchart;