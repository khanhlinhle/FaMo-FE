import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

export default function ExpenseModal(props) {

    const [wallet, setWallet] = useState(null);
    const [walletList, setWalletList] = useState([]);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);
    const [familyList, setFamilyList] = useState([]);
    const [family, setFamily] = useState(null);
    const [categoriesList, setCategoriesList] = useState(null);
    const [category, setCategory] = useState(null);

    const createExpense = async (e) => {
        e.preventDefault();
        const res = await axios.post(`https://localhost:5004/family/${family}/wallets/${wallet}/expenses`, {
            amount: amount,
            description: description,
            date: date,
            category: category
        }, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        console.log(res);
    };

    useEffect(() => {
        async function fetchFamily() {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            };

            try {
                const res = await axios.get(`https://localhost:5004/family`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(res);
                setFamilyList(res.data.data);
            } catch (error) {
                console.log(error)
            };
        };
        fetchFamily();
        getCategoriesList();
    }, []);

    const getCategoriesList = async () => {
        try {
            const result = await axios.get(`https://localhost:5004/categories`);
            console.log(result.data.data);
            setCategoriesList(result.data.data);
        } catch (error) {
            return new Error(error.response.message);
        };
    };

    const handleWallet = (e) => {
        setWallet(e.target.value);
        console.log(e.target.value);
    };

    const handleFamily = (e) => {
        setFamily(e.target.value)
        console.log(e.target.value);
        const selectedFamily = familyList.find(item => item._id === e.target.value);
        setWalletList(selectedFamily.wallets);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
        console.log(e.target.value);
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
                        <span>Add </span>
                        <span className="text-danger">Expense </span>
                        <span>Transaction </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="modal-body-part">
                            <Form>
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicFamily">
                                        <Form.Label>
                                            <h6>Family</h6>
                                        </Form.Label>
                                        <div>
                                            <select className="browser-default custom-select" onChange={(e) => handleFamily(e)}>
                                                <option value="">
                                                    Chooose your family
                                                </option>
                                                {
                                                    familyList && familyList.map(item => <option value={item._id}>{item.name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicWallet">
                                        <Form.Label>
                                            <h6>Wallet</h6>
                                        </Form.Label>
                                        <div>
                                            <select className="browser-default custom-select" onChange={(e) => handleWallet(e)}>
                                                <option value="">
                                                    Chooose your wallet
                                                </option>
                                                {
                                                    walletList && walletList.map(item => <option value={item._id}>{item.type}</option>)
                                                }
                                            </select>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Row>
                        <Row className="modal-body-part">
                            <Form>
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicAmount">
                                        <Form.Label>
                                            <h6>Amount</h6>
                                        </Form.Label>
                                        <Form.Control type="number" onChange={e => setAmount(e.target.value)} placeholder="Amount" />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicCategory">
                                        <Form.Label>
                                            <h6>Category</h6>
                                        </Form.Label>
                                        <div>
                                            <select className="browser-default custom-select" onChange={(e) => handleCategory(e)}>
                                                <option value="">
                                                    Chooose your category
                                                </option>
                                                {
                                                    categoriesList && categoriesList.filter(c => c.type === "Expense").map(item => <option value={item._id}>{item.name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Row>
                        <Row className="modal-body-part">
                            <Form onSubmit={createExpense}>
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicDate">
                                        <Form.Label>
                                            <h6>Date</h6>
                                        </Form.Label>
                                        <Form.Control type="date" placeholder="Date" onChange={e => setDate(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicDescription">
                                        <Form.Label>
                                            <h6>Description</h6>
                                        </Form.Label>
                                        <Form.Control type="text" onChange={e => setDescription(e.target.value)} placeholder="Description" />
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
