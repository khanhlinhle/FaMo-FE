import React from 'react';
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";

export default function WalletModal(props) {
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
                        <span className="modal-title-text">Family Wallet </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="modal-body-part">
                            <Form>
                                <Col lg={4} md={4} s={12} xs={12}>
                                    <Form.Group controlId="formBasicType">
                                        <Form.Label>
                                            <h6>Type</h6>
                                        </Form.Label>
                                        <div>
                                            <select className="browser-default custom-select">
                                                <option value="1">Cash</option>
                                                <option value="2">Bank</option>
                                                <option value="3">Credit</option>
                                            </select>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={4} md={4} s={12} xs={12}>
                                    <Form.Group controlId="formBasicBalance">
                                        <Form.Label>
                                            <h6>Balance</h6>
                                        </Form.Label>
                                        <Form.Control type="number" placeholder="Balance" />
                                    </Form.Group>
                                </Col>
                                <Col lg={4} md={4} s={12} xs={12}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>
                                            <h6>Name</h6>
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Name" />
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Row>
                        <Row className="modal-body-part">
                            <Form>
                                <Col lg={12} md={12} s={12} xs={12}>
                                    <Form.Group controlId="formBasicType">
                                        <Form.Label>
                                            <h6>Share with your family memeber</h6>
                                        </Form.Label>
                                        <Form.Control type="email" placeholder="Your family member email" />
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer >
                    <Button variant="outline-dark" onClick={props.onHide} className="modal-footer-button">Close</Button>
                    <Button variant="outline-success" onClick={props.onHide} className="modal-footer-button">Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
