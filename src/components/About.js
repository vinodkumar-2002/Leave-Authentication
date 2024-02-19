import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function About() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>About Leave Authentication</h2>
          <p>
            Welcome to Leave Authentication, the platform designed to streamline
            the leave request process for both employees and administrators. Our
            system simplifies the process of requesting leaves, ensuring
            transparency and efficiency.
          </p>
          <p>
            Our platform allows employees to submit leave requests online, which
            are then reviewed and authenticated by administrators. Once
            approved, employees can generate QR codes corresponding to their
            approved leaves for easy verification.
          </p>
          <p>
            Leave Authentication aims to provide a seamless experience for
            users, reducing paperwork and manual processes. Our intuitive
            interface and robust security measures ensure that leave requests
            are handled promptly and securely.
          </p>
          <p>
            Whether you're an employee requesting leave or an administrator
            managing requests, Leave Authentication simplifies the process,
            allowing you to focus on what matters most.
          </p>
        </Col>
      </Row>
      {/* Placeholder for additional features */}
    </Container>
  );
}
