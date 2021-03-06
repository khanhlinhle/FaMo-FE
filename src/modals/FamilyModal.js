import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

export default function WalletModal(props) {

    const [name, setName] = useState("");

    const createName = async (e) => {
        e.preventDefault();
        console.log(name);
        const res = await axios.post(`${process.env.REACT_APP_URL}/family`, { name }, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
                        <span>Create </span>
                        <span>A New </span>
                        <span className="modal-title-text">Family </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="modal-body-part">
                            <Form onSubmit={createName} >
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>
                                            <h6>Name</h6>
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicType">
                                        <Form.Label>
                                            <h6>Share with your family memeber</h6>
                                        </Form.Label>
                                        <Form.Control type="email" placeholder="Your family member email" />
                                    </Form.Group>
                                </Col>
                                <div className="info-button-part w-100">
                                    <Button variant="outline-dark" onClick={props.onHide} className="modal-footer-button">Close</Button>
                                    <Button variant="outline-success" onClick={props.onHide} type="submit" className="modal-footer-button">Save</Button>
                                </div>
                            </Form>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}
