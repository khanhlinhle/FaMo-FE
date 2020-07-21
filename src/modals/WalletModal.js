import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

export default function WalletModal(props) {

    useEffect(() => {
        async function fetchFamily() {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            };

            try {
                const res = await axios.get(`https://localhost:5004/family/${family}/wallets/${props.walletId}`, {
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
    }, []);

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

                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}
