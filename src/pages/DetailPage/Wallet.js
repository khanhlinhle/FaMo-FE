import React, { useState } from 'react';
import { Card, Row, Col, Button } from "react-bootstrap";

export default function Wallet(props) {

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <Row className="wallet-part">
                <Col lg={3} md={6} s={12} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="https://image.freepik.com/free-vector/libra-money-currency-with-wallet_36244-323.jpg" className="wallet-icon" />
                        <Card.Body>
                            <Button variant="primary" className="wallet-button">Create family wallet</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} s={12} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="https://image.freepik.com/free-vector/plant-coins-bag-money_24877-60361.jpg" className="wallet-icon" />
                        <Card.Body>
                            <Button variant="success" className="wallet-button">CASH</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} s={12} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="https://image.freepik.com/free-vector/online-banking_24908-60031.jpg" />
                        <Card.Body>
                            <Button variant="warning" className="wallet-button">BANK</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} s={12} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="https://image.freepik.com/free-vector/illustration-hand-holding-credit-card_53876-8126.jpg" className=" wallet-icon" />
                        <Card.Body>
                            <Button variant="info" className="wallet-button">CREDIT</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        </div >
    );
};