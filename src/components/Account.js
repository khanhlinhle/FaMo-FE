import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { Col, Row, Container, Button } from "react-bootstrap";


export default function Account(props) {

    return (
        <Container>
            <Row className="account-part">
                <Col lg={2} md={4} s={12} xs={12}>
                    <img src="https://image.freepik.com/free-vector/dog-head-eyeglasses-st-patrick-s-day_68946-375.jpg" className="avatar" />
                </Col>
                <Col lg={{ span: 7, offset: 3 }} md={8} s={12} xs={12}>
                    <Container className="testing">
                        <form noValidate autoComplete="off" className="name-part">
                            <TextField
                                id="outlined-required"
                                label="First Name"
                                defaultValue="First Name"
                                variant="outlined"
                                className="first-name-part"
                            />
                            <TextField
                                id="outlined-required"
                                label="Last Name"
                                defaultValue="Last Name"
                                variant="outlined"
                                className="last-name-part"
                            />
                        </form>
                        <form noValidate autoComplete="off" className="email-part" >
                            <TextField
                                id="outlined-required"
                                label="Email"
                                defaultValue="Email"
                                variant="outlined"
                                className="email-size"
                            />
                        </form>
                        <form noValidate autoComplete="off" className="password-part" >
                            <TextField
                                id="outlined-required"
                                label="Password"
                                defaultValue="Password"
                                variant="outlined"
                                className="password-size"
                            />
                        </form>
                        <div className="info-button-part">
                            <Button variant="outline-dark" onClick={props.onHide} className="info-button">Update</Button>
                            <Button variant="outline-success" onClick={props.onHide} className="info-button">Log out</Button>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
