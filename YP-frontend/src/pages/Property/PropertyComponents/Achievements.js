import React from "react";
import { Card } from "react-bootstrap";

export default function Achievements() {
  return (
    <>
      <div className="tab-pane profiletab show">
        <div id="achievements-log-switch">
          <Card>
            <Card.Header>
              <h5>
                <strong>Achievements</strong>
              </h5>
            </Card.Header>
            <Card.Body className="bg-white"></Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
