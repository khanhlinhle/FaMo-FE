import React, { useState } from 'react';
import "./LoginPage.css";
import { Tab, Button, Tabs } from "react-bootstrap"
import CreateAccount from './CreateAccount';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from 'axios'

export default function LoginPage() {
    const responseFacebook = async (response) => {
        const res = await axios.get(`https://localhost:5004/auth/login/facebook?fbToken=${response.accessToken}`);

        const { user, token } = res.data.data;
        console.log(user)

        localStorage.setItem("token", token);
    };

    const responseGoogle = async (response) => {
        const res = await axios.get(`https://localhost:5004/auth/login/google?googleToken=${response.accessToken}`);

        const { user, token } = res.data.data;
        console.log(user)

        localStorage.setItem("token", token);
    };

    const dispatch = useDispatch();
    let history = useHistory();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const login = async (e) => {
        e.preventDefault();
        let account = { email: userEmail, password: userPassword };
        const res = await axios.post(`https://localhost:5004/auth/login`, { account }, {
            method: "POST"
        });
        const { user, token } = res.data.data;
        console.log(user);
        localStorage.setItem("token", token);
        dispatch({ type: "LOGIN", payload: { isAuthenticated: true } });
        history.push("/detail");
    };

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    };

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
                                    onChange={handleEmailChange}
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
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="createAccount">
                                <Button variant="outline-success" type="submit" className="login-button" onClick={login}>LOG IN</Button>
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
                        <div>
                            <div>
                                <FacebookLogin
                                    appId="301690914304040"
                                    fields="name,email,picture"
                                    // onClick={componentClicked}
                                    callback={responseFacebook}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} className="facebook">
                                            <i className="fab fa-facebook icon-facebook"></i>
                                            Connect with Facebook
                                        </button>
                                    )}
                                >
                                </FacebookLogin>
                            </div>
                            <div>
                                <GoogleLogin
                                    clientId="934552273757-0ubllrrjsu86i7cg93nikke5amou1qti.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google">
                                            <i className="fab fa-google icon-google"></i>
                                            Connect with Google
                                        </button>
                                    )}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"}
                                ></GoogleLogin>
                            </div>
                            <div className="apple">
                                <i className="fab fa-apple icon-apple"></i>
                                <span>CONNECT WITH APPLE</span>
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs >
        </div >
    );
};
