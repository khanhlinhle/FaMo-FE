import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Col, Row, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

export default function Account(props) {

    const dispatch = useDispatch();
    let history = useHistory();
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            };

            try {
                const res = await axios.get(`https://localhost:5004/users/me`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                const { firstName, lastName, email } = res.data.data;
                setFirstName(firstName);
                setLastName(lastName);
                setEmail(email);
            } catch (error) {
                localStorage.removeItem("token");
            };
        };
        fetchUser();
    }, [isAuthenticated]);

    const logout = async (e) => {
        e.preventDefault();
        const res = await axios.post(`https://localhost:5004/auth/logout`, {}, {
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
                                value={firstName}
                                variant="outlined"
                                className="first-name-part"
                            />
                            <TextField
                                id="outlined-required"
                                label="Last Name"
                                value={lastName}
                                variant="outlined"
                                className="last-name-part"
                            />
                        </form>
                        <form noValidate autoComplete="off" className="email-part" >
                            <TextField
                                id="outlined-required"
                                label="Email"
                                value={email}
                                variant="outlined"
                                className="email-size"
                            />
                        </form>
                        <div className="info-button-part">
                            <Button variant="outline-dark" className="info-button">Update</Button>
                            <Button variant="outline-success" className="info-button" type="submit" onClick={logout}>Log out</Button> :
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
