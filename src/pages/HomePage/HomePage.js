import React from 'react';
import "./HomePage.css";
import { Row, Container, Col, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <div>
            <div className="banner-part">
                <Container>
                    <Row>
                        <Col lg={5} md={5} s={12} xs={12}>
                            <img src="https://www.equifaira.com/img/pig.png" />
                            <h3 className="banner-text-left">
                                <span>Using </span>
                                <strong className="famo">FaMo</strong>
                                <span> to farm more</span>
                            </h3>
                        </Col>
                        <Col lg={{ span: 6, offset: 1 }} md={{ span: 6, offset: 1 }} s={12} xs={12} className="banner-text">
                            <h1 className="banner-title">
                                Family Money
                        </h1>
                            <h3 className="banner-slogan">
                                Simple way to manage family finances.
                        </h3>
                            <div>
                                <Button className="banner-login-button">
                                    <Link to="/detail" className="login-text">GET STARTED</Link>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="product-part">
                <Container>
                    <Row>
                        <Col lg={3} md={12} s={12} xs={12}>
                            <img src="https://image.freepik.com/free-vector/reading-list-concept-illustration_114360-1090.jpg" className="body-image" />
                        </Col>
                        <Col lg={{ span: 7, offset: 2 }} md={12} s={12} xs={12} off>
                            <p className="body-text">
                                <strong>Family Money</strong> helps you get just about everything managed. A smart, easy-to-use website that allows you to track and categorize your family in-and-out money.
                           </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 7, offset: 0 }} md={12} s={12} xs={12} off>
                            <p className="body-text">
                                <strong>Family Money</strong> helps you set budgets that are easy to stick to, based on your family daily spending.
                           </p>
                        </Col>
                        <Col lg={5} md={12} s={12} xs={12}>
                            <img src="https://image.freepik.com/free-vector/tiny-man-woman-with-big-open-wallet_74855-5943.jpg" className="body-image" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={12} s={12} xs={12}>
                            <img src="https://image.freepik.com/free-vector/statistical-data-abstract-paper-tablet_3446-313.jpg" className="body-image" />
                        </Col>
                        <Col lg={{ span: 7, offset: 2 }} md={12} s={12} xs={12} off>
                            <p className="body-text">
                                <strong>Family Money</strong> helps you have a clear view on your spending patterns. Understanding where your family money comes and goes with easy-to-read graphs.
                           </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-part">
                <Container>
                    <p className="footer-text">
                        Copyright © 2020 Le Khanh Linh. All rights reserved.
                    </p>
                </Container>
            </div>
        </div>
    )
}
