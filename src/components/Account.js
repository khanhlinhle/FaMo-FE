import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Col, Row, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import FamilyModal from "./../modals/FamilyModal";

export default function Account(props) {

    let history = useHistory();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [familyModalShow, setFamilyModalShow] = useState(false);

    const logout = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${process.env.REACT_APP_URL}/auth/logout`, {}, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT", payload: { isAuthenticated: false } });
        history.push("/");
    };

    return (
        <Container>
            {
                user.data ?
                    <Row className="account-part">
                        <Col lg={3} md={12} s={12} xs={12}>
                            <img src="https://image.freepik.com/free-vector/dog-head-eyeglasses-st-patrick-s-day_68946-375.jpg" className="avatar" />
                        </Col>
                        <Col lg={9} md={12} s={12} xs={12}>
                            <Container className="testing">
                                <form noValidate autoComplete="off" className="name-part">
                                    <TextField
                                        id="outlined-required"
                                        label="First Name"
                                        value={user.data.firstName}
                                        variant="outlined"
                                        className="first-name-part"
                                    />
                                    <TextField
                                        id="outlined-required"
                                        label="Last Name"
                                        value={user.data.lastName}
                                        variant="outlined"
                                        className="last-name-part"
                                    />
                                </form>
                                <form noValidate autoComplete="off" className="email-part" >
                                    <TextField
                                        id="outlined-required"
                                        label="Email"
                                        value={user.data.email}
                                        variant="outlined"
                                        className="email-size"
                                    />
                                </form>
                                <div className="account-button">
                                    <Button variant="outline-dark" className="info-button">Update</Button>
                                    <Button variant="outline-success" className="info-button" type="submit" onClick={logout}>Log out</Button>
                                    <Button variant="outline-info" onClick={() => setFamilyModalShow(true)}>CREATE FAMILY</Button>
                                    <FamilyModal
                                        show={familyModalShow}
                                        onHide={() => setFamilyModalShow(false)}
                                    />
                                </div>
                            </Container>
                        </Col>
                    </Row> : ""
            }
        </Container>
    );
};
