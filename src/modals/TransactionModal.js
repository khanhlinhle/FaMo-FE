import React, { useState, useEffect } from 'react';
import { Modal, Container, Form, Row, Button, Col } from "react-bootstrap";
import axios from "axios";

export default function TransactionModal(props) {

    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const family = props.family;
    const wallet = props.wallet;
    const expense = props.expense;
    const income = props.income;

    console.log(expense)

    const getCategoriesList = async () => {
        try {
            const result = await axios.get(`https://localhost:5004/categories`);
            setCategoriesList(result.data.data);
        } catch (error) {
            return new Error(error.message);
        };
    };

    const getSelectedExpense = async () => {
        try {
            const result = await axios.get(`https://localhost:5004/family/${family._id}/wallets/${wallet._id}/expenses/${expense._id}`);
            console.log(result);
        } catch (error) {
            return new Error(error.message);
        };
    }


    useEffect(() => {
        getCategoriesList();
        if (family && wallet) {
            // fetchWallet();
            // fetchExpense();
            // fetchIncome();
            getSelectedExpense();
        }
    }, [wallet]);

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
                            <Form >
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>
                                            <h6>Name</h6>
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Name" />
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
