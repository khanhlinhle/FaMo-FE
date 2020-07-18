import React, { useState } from 'react'
import { Nav, Navbar } from "react-bootstrap";
import "./DetailPage.css";
import Transaction from "./../../components/Transaction";
import Report from "./../../components/Report";
import Account from "./../../components/Account";
import Categories from "./../../components/Categories";
import Wallet from "./../../components/Wallet"


export default function DetailPage() {

    const [page, setPage] = useState(0);

    const onAccount = () => {
        setPage(0)
    };
    const onCategories = () => {
        setPage(2)
    };
    const onWallet = () => {
        setPage(1)
    };
    const onTransaction = () => {
        setPage(3)
    };
    const onReport = () => {
        setPage(4)
    };

    return (
        <div className="test">
            <Navbar bg="light">
                <Navbar.Brand href="#home">Brand link</Navbar.Brand>
            </Navbar>
            <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={onAccount} className="tab-part">Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={onWallet} className="tab-part">Wallet</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" onClick={onCategories} className="tab-part">Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4" onClick={onTransaction} className="tab-part">Transaction</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-5" onClick={onReport} className="tab-part">Report</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-6" className="tab-part">Budget</Nav.Link>
                </Nav.Item>
            </Nav>
            {
                page == 0 ?
                    <Account page={0} /> :
                    (page == 1 ? <Wallet page={1} /> :
                        (page == 2 ? <Categories page={2} /> :
                            (page == 3 ? <Transaction page={3} /> :
                                page == 4 ? <Report page={4} /> : <Report page={5} />)))
            }

        </div >
    );
};


