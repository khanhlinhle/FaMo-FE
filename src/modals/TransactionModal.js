import React, { useState, useEffect } from 'react';
import { Modal, Container, Form, Row, Button, Col } from "react-bootstrap";
import axios from "axios";

export default function TransactionModal(props) {

    const family = props.family;
    const wallet = props.wallet;
    const expense = props.expense;
    const expenseList = props.expenseList;
    const setExpenseList = props.setExpenseList;
    const incomeList = props.incomeList;
    const setIncomeList = props.setIncomeList;
    const income = props.income;
    const categoriesList = props.categoriesList;
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    console.log('expense', expense);
    console.log('income', income);
    console.log('description', description);
    console.log('date', date)
    console.log(wallet)


    const updateOldExpense = async () => {
        try {
            const result = await axios.put(`${process.env.REACT_APP_URL}/family/${family._id}/wallets/${wallet._id}/expenses/${expense._id}`, {
                amount: amount,
                description: description,
                date: date,
                category: category
            }, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const updatedExpense = result.data.data.expense;
            const temp = [...expenseList]
            for (let index = 0; index < temp.length; index++) {
                if (temp[index]._id === updatedExpense._id) {
                    temp[index] = { ...updatedExpense }
                };
            };
            setExpenseList(temp);

        } catch (error) {
            console.log(error)
            return new Error(error.message);
        };
    };

    const deleteOldExpense = async () => {
        try {
            const result = await axios.delete(`${process.env.REACT_APP_URL}/family/${family._id}/wallets/${wallet._id}/expenses/${expense._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const { expenseList } = result.data.data;
            setExpenseList(expenseList);
        } catch (error) {
            console.log(error)
            return new Error(error.message);
        };
    };

    const updateOldIncome = async () => {
        try {
            const result = await axios.put(`${process.env.REACT_APP_URL}/family/${family._id}/wallets/${wallet._id}/incomes/${income._id}`, {
                amount: amount,
                description: description,
                date: date,
                category: category
            }, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const updatedIncome = result.data.data.income;
            const temp = [...incomeList]
            for (let index = 0; index < temp.length; index++) {
                if (temp[index]._id === updatedIncome._id) {
                    temp[index] = { ...updatedIncome }
                };
            };
            setIncomeList(temp);
        } catch (error) {
            return new Error(error.message);
        };
    };

    const deleteOldIncome = async () => {
        try {
            const result = await axios.delete(`${process.env.REACT_APP_URL}/family/${family._id}/wallets/${wallet._id}/incomes/${income._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const { incomeList } = result.data.data;
            setIncomeList(incomeList);
        } catch (error) {
            console.log(error)
            return new Error(error.message);
        };
    };

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        if (income) {
            updateOldIncome(e);
            deleteOldIncome(e);
        }
        else {
            updateOldExpense(e);
            deleteOldExpense(e);
        };
    };

    const handleDeleteInfo = (e) => {
        e.preventDefault();
        if (income) {
            deleteOldIncome(e);
        }
        else {
            deleteOldExpense(e);
        };
    };

    const getColor = (type) => {
        if (type == "Cash") return "#168b9d"
        else if (type == "Bank") return "#f8bf33"
        else if (type == "Credit") return "#c8eaee"
    };

    useEffect(() => {
        if (expense) {
            setDescription(expense.description);
            setAmount(expense.amount);
            setDate(expense.date);
            setCategory(expense.category);

            console.log('props.category', category)
            console.log('categoriesList', categoriesList)
            console.log('category', categoriesList.find(item => item._id == category))
        } else if (income) {
            setDescription(income.description);
            setAmount(income.amount);
            setDate(income.date);
            setCategory(income.category);
        };
    }, [expense, income]);

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="modal-title" style={{ color: getColor(wallet.type) }}>{wallet.type}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="modal-body-part">
                            <Form >
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicDescription">
                                        <Form.Label>
                                            <h6>Description</h6>
                                        </Form.Label>
                                        <Form.Control type="text"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)} placeholder="Description" />
                                    </Form.Group>
                                </Col>

                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicAmount">
                                        <Form.Label>
                                            <h6>Amount</h6>
                                        </Form.Label>
                                        <Form.Control type="text"
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)} placeholder="Amount" />
                                    </Form.Group>
                                </Col>

                            </Form>
                        </Row>
                        <Row className="modal-body-part">
                            <Form>
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicCategory">
                                        <Form.Label>
                                            <h6>Category</h6>
                                        </Form.Label>
                                        <div>
                                            <select className="browser-default custom-select" onChange={e => setCategory(e.target.value)}>
                                                {
                                                    categoriesList && categoriesList.map(item => <option value={item._id} selected={item._id == category}>{item.name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} s={12} xs={12}>
                                    <Form.Group controlId="formBasicWallet">
                                        <Form.Label>
                                            <h6>Date</h6>
                                        </Form.Label>
                                        <Form.Control type="date"
                                            onChange={e => setDate(e.target.value)} placeholder="Description"
                                            value={date.slice(0, 10)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <div className="button-part">
                                    <div className="info-button-part w-100" onSubmit={(e) => handleUpdateInfo(e)}>
                                        <Button variant="outline-dark" onClick={props.onHide} className="modal-footer-button">Close</Button>
                                        <Button variant="outline-success" onClick={props.onHide} type="submit" className="modal-footer-button">Update</Button>
                                    </div>
                                    <div onSubmit={(e) => handleDeleteInfo(e)}>
                                        <Button variant="outline-danger" onClick={props.onHide} type="submit" className="modal-footer-button">Delete</Button>
                                    </div>
                                </div>
                            </Form>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}
