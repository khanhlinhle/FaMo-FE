import React from 'react';
import "./LoginPage.css";
import { Tab, Button, Tabs } from "react-bootstrap"
import CreateAccount from './CreateAccount';

export default function LoginPage() {
    return (
        <div className="wrapper">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="create-account-tab">
                <Tab eventKey="createAccount" title="Create Account">
                    <CreateAccount />
                </Tab>
                <Tab eventKey="login" title="Log in">
                    <div className="form-wrapper">
                        <div className="create-account-text">Log in</div>
                        <form noValidate>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className=""
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    noValidate
                                // onChange={handleEmailChange}
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
                                // ref={passwordRef}
                                />
                            </div>
                            <div className="createAccount">
                                <Button variant="outline-success" type="submit" className="login-button">LOG IN</Button>
                            </div>
                        </form>
                        <div className="break-box">
                            <div className="break-box-left">
                                <div className="break-line-small"></div>
                            </div>
                            <small className="text-muted">OR</small>
                            <div className="break-box-right">
                                <div className="break-line-small"></div>
                            </div>
                        </div>
                        <div className="social-accounts">
                            <div className="facebook">
                                <i className="fab fa-facebook-square icon-facebook"></i>
                                <span>CONNECT WITH FACEBOOK</span>
                            </div>
                            <div className="google">
                                <i className="fab fa-google icon-google"></i>
                                <span>CONNECT WITH GOOGLE</span>
                            </div>
                            <div className="apple">
                                <i className="fab fa-apple icon-apple"></i>
                                <span>CONNECT WITH APPLE</span>
                            </div>
                        </div>

                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
