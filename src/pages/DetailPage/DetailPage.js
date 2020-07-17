import React, { useState } from 'react'
import { Nav, Navbar } from "react-bootstrap";
import "./DetailPage.css";
import Wallet from './Wallet';
import Transaction from './Transaction';
import Report from './Report';
import Account from './Account';
import Categories from './Categories';


export default function DetailPage() {

    const [page, setPage] = useState(0);

    const onAccount = () => {
        setPage(0)
    };
    const onCategories = () => {
        setPage(1)
    };
    const onWallet = () => {
        setPage(2)
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
                    <Nav.Link eventKey="link-1" onClick={onAccount}>Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={onCategories}>Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" onClick={onWallet}>Wallet</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4" onClick={onTransaction}>Transaction</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-5" onClick={onReport}>Report</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-6">Budget</Nav.Link>
                </Nav.Item>
            </Nav>
            {
                page == 0 ?
                    <Account page={0} /> :
                    (page == 1 ? <Categories page={1} /> :
                        (page == 2 ? <Wallet page={2} /> :
                            (page == 3 ? <Transaction page={3} /> :
                                page == 4 ? <Report page={4} /> : <Report page={5} />)))
            }

        </div >
    );
};


