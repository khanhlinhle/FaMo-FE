import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import NumberFormat from 'react-number-format';

export default function WalletModal(props) {

    const [incomeList, setIncomeList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const family = props.family;
    const wallet = props.wallet;
    console.log(wallet)
    useEffect(() => {
        fetchExpense();
        fetchIncome();
        fetchWallet();
    }, []);

    async function fetchExpense() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        };

        try {
            const res = await axios.get(`https://localhost:5004/family/${family._id}/wallets/${wallet._id}/expenses`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("expense list", res);
            setExpenseList(res.data.data);
        } catch (error) {
            console.log(error)
        };
    };

    async function fetchIncome() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        };

        try {
            const res = await axios.get(`https://localhost:5004/family/${family._id}/wallets/${wallet._id}/incomes`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("income list", res);
            setIncomeList(res.data.data);
        } catch (error) {
            console.log(error)
        };
    };

    async function fetchWallet() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        };

        try {
            const res = await axios.get(`https://localhost:5004/family/${family._id}/wallets/${wallet._id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("wallet selected", res.data.data);
            setSelectedWallet(res.data.data);
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <div>
            {
                selectedWallet && selectedWallet.type === "Bank" ?
                    <Modal
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" className="modal-title">{selectedWallet.type}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <div className="balance-part">
                                    <span className="balance-title"><strong>Current Balance: </strong></span>
                                    <NumberFormat value={selectedWallet.balance} displayType={'text'} className="balance-title-size" thousandSeparator={true} prefix={'$'} />
                                </div>
                            </Container>
                        </Modal.Body>
                    </Modal>
                    : ""
            }
        </div >
    );
};
