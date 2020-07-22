import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, DropdownButton } from "react-bootstrap";
import WalletDetail from "../modals/WalletDetail";
import DropdownItem from 'react-bootstrap/DropdownItem';
import axios from "axios";

export default function Wallet(props) {

    const [page, setPage] = useState(0);

    const onWalletDetail = () => {
        setPage(0)
    };


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
        <>
            <div className="bao-container">
                <div className="bao-wallet">
                    <div className="wallet-button-column-0">
                        <Card >
                            <Card.Img variant="top" src="https://image.freepik.com/free-vector/libra-money-currency-with-wallet_36244-323.jpg" />
                            <div className="middle">
                                <DropdownButton onSelect={handleFamily} id="dropdown-basic-button" title={family ? <span className="wallet-button">{family.name}</span> : <span className="wallet-button">Family</span>}>
                                    {
                                        familyList ? familyList.map(item =>
                                            <DropdownItem eventKey={item.name} key={item._id} >{item.name}</DropdownItem>
                                        ) : <div></div>
                                    }
                                </DropdownButton>
                            </div>
                        </Card>
                    </div>
                    {
                        walletList && walletList.map(item =>
                            (
                                item.type === "Cash" ?
                                    <div className="wallet-button-column-1">
                                        <Card.Img variant="top" src="https://image.freepik.com/free-vector/plant-coins-bag-money_24877-60361.jpg" />
                                        <div className="middle">
                                            <Button variant="success" className="wallet-button" value={item._id} onClick={() => { onWalletDetail(); setSelectedWallet(item) }}>{item.type}</Button>
                                        </div>
                                    </div>
                                    :
                                    (item.type === "Bank" ?
                                        <div className="wallet-button-column-2">
                                            <Card.Img variant="top" src="https://image.freepik.com/free-vector/online-banking_24908-60031.jpg" className="bank-icon" />
                                            <div className="middle">
                                                <Button variant="dark" className="wallet-button" value={item._id} onClick={() => { onWalletDetail(); setSelectedWallet(item) }}>{item.type}</Button>
                                            </div>
                                        </div> :
                                        (item.type === "Credit" ?
                                            <div className="wallet-button-column-3">
                                                <Card.Img variant="top" src="https://image.freepik.com/free-vector/illustration-hand-holding-credit-card_53876-8126.jpg" className="credit-icon" />
                                                <div className="middle">
                                                    <Button variant="info" className="wallet-button" value={item._id} onClick={() => { onWalletDetail(); setSelectedWallet(item) }}>{item.type}</Button>
                                                </div>
                                            </div>
                                            : ""))
                            ))}
                </div>
                <div className="list-column">
                    {
                        page == 0 ?
                            <WalletDetail
                                family={family}
                                wallet={selectedWallet}
                                page={0}
                            />
                            :
                            ""
                    }
                </div>
            </div>


        </>
    );
};