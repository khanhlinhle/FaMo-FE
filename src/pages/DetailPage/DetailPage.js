import React, { useState } from 'react'
import { Nav, Navbar } from "react-bootstrap";
import "./DetailPage.css";
import Transaction from "./../../components/Transaction";
import Report from "./../../components/Report";
import Account from "./../../components/Account";
import Wallet from "./../../components/Wallet"


export default function DetailPage() {

    const [page, setPage] = useState(0);

    const onAccount = () => {
        setPage(0)
    };
    const onWallet = () => {
        setPage(1)
    };
    const onTransaction = () => {
        setPage(2)
    };
    const onReport = () => {
        setPage(3)
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
                    <Nav.Link eventKey="link-3" onClick={onTransaction} className="tab-part">Transaction</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4" onClick={onReport} className="tab-part">Report</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-5" className="tab-part">Budget</Nav.Link>
                </Nav.Item>
            </Nav>
            {
                page == 0 ?
                    <Account page={0} /> :
                    (page == 1 ? <Wallet page={1} /> :
                        (page == 2 ? <Transaction page={2} /> :
                            page == 3 ? <Report page={3} /> : <Report page={4} />))
            }

        </div >
    );
};


