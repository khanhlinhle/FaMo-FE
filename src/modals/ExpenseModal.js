import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";

export default function ExpenseModal(props) {

    // const addExpense = () => {
    //     const [wallet, setWallet] = useState("");
    //     const [amount, setAmount] = useState(0);
    //     const [category, setCategory] = useState("");
    //     const [date, setDate] = useState(0);
    //     const [description, setDescription] = useState("");
    // };

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
                        <span>Add </span>
                        <span className="text-danger">Expense </span>
                        <span>Transaction </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="modal-body-part">
                            <Form>
                                <Col lg={4} md={4} s={12} xs={12}>
                                    <Form.Group controlId="formBasicWallet">
                                        <Form.Label>
                                            <h6>Wallet</h6>
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
                                    <Form.Group controlId="formBasicAmount">
                                        <Form.Label>
                                            <h6>Amount</h6>
                                        </Form.Label>
                                        <Form.Control type="number" placeholder="Amount" />
                                    </Form.Group>
                                </Col>
                                <Col lg={4} md={4} s={12} xs={12}>
                                    <Form.Group controlId="formBasicCategory">
                                        <Form.Label>
                                            <h6>Category</h6>
                                        </Form.Label>
                                        <div>
                                            <select className="browser-default custom-select">
                                                <option value="1">Foods</option>
                                                <option value="2">Drinks</option>
                                                <option value="3">Entertainment</option>
                                            </select>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Row>
                        <Row className="modal-body-part">
                            <Form>
                                <Col lg={4} md={4} s={12} xs={12}>
                                    <Form.Group controlId="formBasicDate">
                                        <Form.Label>
                                            <h6>Date</h6>
                                        </Form.Label>
                                        <Form.Control type="date" placeholder="Date" />
                                    </Form.Group>
                                </Col>
                                <Col lg={{ span: 6, offset: 2 }} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicDescription">
                                        <Form.Label>
                                            <h6>Description</h6>
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Description" />
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
