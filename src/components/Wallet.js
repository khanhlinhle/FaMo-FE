import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, DropdownButton } from "react-bootstrap";
import WalletModal from "../modals/WalletModal";
import DropdownItem from 'react-bootstrap/DropdownItem';
import axios from "axios";

export default function Wallet(props) {

    const [walletModalShow, setWalletModalShow] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [familyList, setFamilyList] = useState([]);
    const [family, setFamily] = useState(null);
    const [walletList, setWalletList] = useState([]);

    useEffect(() => {
        async function fetchFamily() {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            };

            try {
                const res = await axios.get(`https://localhost:5004/family/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(res.data.data);
                setFamilyList(res.data.data);
            } catch (error) {
                console.log(error)
            };
        };
        fetchFamily();
    }, []);

    const handleFamily = (e) => {
        const selectedFamily = familyList.find(item => item.name == e);
        setFamily(selectedFamily)
        setWalletList(selectedFamily.wallets);
    };
    return (
        <Row className="wallet-part">
            <Col lg={3} md={6} s={12} xs={12}>
                <Card>
                    <Card.Img variant="top" src="https://image.freepik.com/free-vector/libra-money-currency-with-wallet_36244-323.jpg" className="wallet-icon" />
                    <Card.Body>
                        <DropdownButton onSelect={handleFamily} id="dropdown-basic-button" title={family ? <span className="wallet-button">{family.name}</span> : <span className="wallet-button">Family</span>}>
                            {
                                familyList ? familyList.map(item =>
                                    <DropdownItem eventKey={item.name} key={item._id} >{item.name}</DropdownItem>
                                ) : <div></div>
                            }
                        </DropdownButton>
                    </Card.Body>
                </Card>
            </Col>

            <WalletModal
                family={family}
                wallet={selectedWallet}
                show={walletModalShow}
                onHide={() => setWalletModalShow(false)}
            />

            {
                walletList && walletList.map(item =>
                    <Col lg={3} md={6} s={12} xs={12} key={item._id} >
                        {
                            item.type === "Cash" ?
                                <Card>
                                    <Card.Img variant="top" src="https://image.freepik.com/free-vector/plant-coins-bag-money_24877-60361.jpg" className="wallet-icon" />
                                    < Card.Body >
                                        <Button variant="success" className="wallet-button" value={item._id} onClick={() => { setWalletModalShow(true); setSelectedWallet(item); }}>{item.type}</Button>
                                    </Card.Body>
                                </Card> :
                                (item.type === "Bank" ?
                                    <Card>
                                        <Card.Img variant="top" src="https://image.freepik.com/free-vector/online-banking_24908-60031.jpg" />
                                        < Card.Body >
                                            <Button variant="warning" className="wallet-button" value={item._id} onClick={() => { setWalletModalShow(true); setSelectedWallet(item); }}>{item.type}</Button>
                                        </Card.Body>
                                    </Card> :
                                    (item.type === "Credit" ?
                                        <Card>
                                            <Card.Img variant="top" src="https://image.freepik.com/free-vector/illustration-hand-holding-credit-card_53876-8126.jpg" className=" wallet-icon" />
                                            < Card.Body >
                                                <Button variant="info" className="wallet-button" value={item._id} onClick={() => { setWalletModalShow(true); setSelectedWallet(item); }}>{item.type}</Button>
                                            </Card.Body>
                                        </Card> : ""))

                        }
                    </Col>
                )}
        </Row >
    );
};