import React from 'react';
import { Button } from "react-bootstrap";

export default function CreateAccount() {
    return (
        <div className="form-wrapper">
            <div className="create-account-text">Create Account</div>
            <form noValidate>
                <div className="firstName">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className=""
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
                        placeholder="Password"
                        type="password"
                        name="password"
                        noValidate
                    />
                </div>
                <div className="createAccount">
                    <Button variant="outline-success" className="create-account-button" type="submit">CREATE ACCOUNT</Button>
                    <small>Already Have an Account</small>
                </div>
            </form>
        </div>
    )
}