import { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Pageheader from '../../../layouts/layoutcomponents/Pageheader';
import { Annotations, Basicline, Brushchart, Dashed, Gradientline, Linechartwithlabels, Missingnullvalues, Stepline, Syncing, Zoomabletime } from '../../../common/Chartfunction';


const Linechart = () => {
    return (
        <Fragment>
            <Pageheader homepage='Apex Line Charts' activepage='Apex Charts' page='Apex Line Charts' />

            <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Basic Line Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="line-chart">
                                <Basicline />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Line Chart With Data Labels</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="line-chart-datalabels">
                                <Linechartwithlabels />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Zoomable Time Series</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="zoom-chart">
                                <Zoomabletime />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Line With Annotations</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="annotation-chart">
                                <Annotations />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Brush Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Brushchart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>StepLine Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="stepline-chart">
                                <Stepline />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Gradient Line Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="gradient-chart">
                                <Gradientline />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Missing/Null Values Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="null-chart">
                                <Missingnullvalues />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Dashed Line Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="dashed-chart">
                                <Dashed />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Syncing Charts</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Syncing />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Linechart;