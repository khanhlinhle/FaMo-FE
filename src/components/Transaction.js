import React, { useState } from 'react';
import { Col, Button, Card, Row } from "react-bootstrap";
import ExpenseModal from "./../modals/ExpenseModal";
import IncomeModal from "./../modals/IncomeModal";

export default function Transaction() {

    const [expenseModalShow, setExpenseModalShow] = useState(false);
    const [incomeModalShow, setIncomeModalShow] = useState(false);

    return (
        <div>
            <Row className="wallet-part">
                <Col lg={3} md={8} s={12} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="https://image.freepik.com/free-vector/receipt-bill-invoice-receipt-mobile-phone-cellphone-illustration-isolated-flat-cartoon_101884-447.jpg" className="wallet-icon" />
                        <Card.Body>
                            <Button variant="danger" className="wallet-button" onClick={() => setExpenseModalShow(true)}>Expense</Button>
                            <ExpenseModal
                                show={expenseModalShow}
                                onHide={() => setExpenseModalShow(false)}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={{ span: 3, offset: 1 }} md={8} s={12} xs={12}>
                    <Card>
                        <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/716959709646684261/733565252809261097/Linh-01.jpg" />
                        <Card.Body>
                            <Button variant="info" className="wallet-button" onClick={() => setIncomeModalShow(true)}>Income</Button>
                            <IncomeModal
                                show={incomeModalShow}
                                onHide={() => setIncomeModalShow(false)}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
