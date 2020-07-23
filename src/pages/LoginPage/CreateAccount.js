import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from "axios";

export default function CreateAccount() {

    const dispatch = useDispatch();
    let history = useHistory();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const createUser = async (e) => {
        e.preventDefault();
        const res = await axios.post(`https://localhost:5004/users`, {
            firstName: firstName,
            lastName: lastName,
            email: userEmail,
            password: userPassword
        }, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(res);
    };

    return (
        <div className="form-wrapper">
            <div className="create-account-text">Create Account</div>
            <form noValidate>
                <div className="firstName">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className=""
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        noValidate
                    />
                </div>
                <div className="lastName">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className=""
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        noValidate
                    />
                </div>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className=""
                        onChange={e => setUserEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        name="email"
                        noValidate
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        className=""
                        onChange={e => setUserPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        name="password"
                        noValidate
                    />
                </div>
                <div className="createAccount">
                    <Button variant="outline-success" className="create-account-button" onClick={createUser}>CREATE ACCOUNT</Button>
                    <small>Already Have an Account</small>
                </div>
            </form>
        </div>
    )
}