import React, { useState, useEffect } from 'react';
import { Container, DropdownButton, Tab, Tabs, Col, Row } from "react-bootstrap";
import DropdownItem from 'react-bootstrap/DropdownItem';
import moment from 'moment';
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";

export default function Report() {

    const token = localStorage.getItem("token");
    const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [selectedMonth, setSelectedMonth] = useState(moment(new Date()).month());

    const [categoriesList, setCategoriesList] = useState([]);
    const [familyList, setFamilyList] = useState([]);
    const [family, setFamily] = useState(null);

    const [walletList, setWalletList] = useState([]);

    const [yearIncomes, setYearIncomes] = useState([]);
    const [yearExpenses, setYearExpenses] = useState([]);

    const [monthlyIncomes, setMonthlyIncomes] = useState([]);
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);

    const getFamilyList = async () => {
        if (!token) {
            return;
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/family`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setFamilyList(res.data.data);
            setFamily(res.data.data[0]);
        } catch (error) {
            console.log(error)
        };
    };

    const getCategoriesList = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_URL}/categories`);
            setCategoriesList(result.data.data);
        } catch (error) {
            return new Error(error.message);
        };
    };

    const getIncomesAndExpenses = async () => {
        if (!token) {
            return;
        };

        try {
            const resIn = await axios.post(`${process.env.REACT_APP_URL}/family/incomes/report`,
                {
                    wallets: walletList,
                },
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

            const resEx = await axios.post(`${process.env.REACT_APP_URL}/family/expenses/report`,
                {
                    wallets: walletList,
                },
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

            // group by months
            console.log('incomes ', resIn.data.data);
            console.log('expenses ', resEx.data.data);
            const incomesEachMonth = [];
            const expensesEachMonth = [];
            for (let i = 0; i < monthsOfYear.length; i++) {

                const sumIn = resIn.data.data.reduce((preVal, currentVal) => {
                    return preVal += moment(currentVal.date).month() === i ? currentVal.amount : 0;
                }, 0);

                const sumEx = resEx.data.data.reduce((preVal, currentVal) => {
                    return preVal += moment(currentVal.date).month() === i ? currentVal.amount : 0;
                }, 0);

                incomesEachMonth.push(sumIn);
                expensesEachMonth.push(sumEx);
            }

            setYearIncomes(incomesEachMonth);
            setYearExpenses(expensesEachMonth);

            const monthlyIncomes = [];
            const monthlyExpenses = [];
            for (const cate of categoriesList) {
                if (cate.type === "Income") {
                    const sum = resIn.data.data.reduce((preVal, currentVal) => {
                        return preVal += (moment(currentVal.date).month() === selectedMonth && currentVal.category === cate._id)
                            ? currentVal.amount
                            : 0;
                    }, 0);

                    if (sum > 0) {
                        monthlyIncomes.push({
                            label: cate.name,
                            amount: sum
                        });
                    }
                }
                else {
                    const sum = resEx.data.data.reduce((preVal, currentVal) => {
                        return preVal += (moment(currentVal.date).month() === selectedMonth && currentVal.category === cate._id)
                            ? currentVal.amount
                            : 0;
                    }, 0);

                    if (sum > 0) {
                        monthlyExpenses.push({
                            label: cate.name,
                            amount: sum
                        });
                    }
                }
            }

            setMonthlyIncomes(monthlyIncomes.sort((a, b) => a > b ? -1 : 1));
            setMonthlyExpenses(monthlyExpenses.sort((a, b) => a > b ? -1 : 1));
        } catch (error) {
            console.log(error)
        };
    };

    useEffect(() => {
        getCategoriesList();
        getFamilyList();
    }, []);

    const handleFamily = (e) => {
        const selectedFamily = familyList.find(item => item.name === e);
        setFamily(selectedFamily);
        setWalletList(selectedFamily.wallets);
        getIncomesAndExpenses();
    };

    const handleMonth = (e) => {
        const selectedMonth = monthsOfYear.findIndex(item => item === e);
        setSelectedMonth(selectedMonth);
        getIncomesAndExpenses();
    };

    return (
        <div className="report-tab">
            <Tabs defaultActiveKey="month">
                <Tab eventKey="month" title="Monthly report">
                    <Container>
                        <div className="report-part">
                            <DropdownButton onSelect={handleFamily} title={family ? <span className="wallet-button">{family.name}</span> : <span className="report-button">Family</span>}>
                                {
                                    familyList ? familyList.map(item =>
                                        <DropdownItem eventKey={item.name} key={item._id} >{item.name}</DropdownItem>
                                    ) : <div></div>
                                }
                            </DropdownButton>
                            <DropdownButton onSelect={handleMonth} title={<span className="wallet-button">{monthsOfYear[selectedMonth]}</span>}>
                                {
                                    monthsOfYear.map(item =>
                                        <DropdownItem eventKey={item} key={item}>{item}</DropdownItem>
                                    )
                                }
                            </DropdownButton>
                        </div>
                    </Container>
                    <Row>
                        <Col lg={6} md={6} s={12} xs={12}>
                            <div>Monthy Incomes</div>
                            <Doughnut
                                data={{
                                    labels: monthlyIncomes.map(i => i.label),
                                    datasets: [
                                        {
                                            label: "Incomes",
                                            backgroundColor: [
                                                "#F29E4C",
                                                "#F1C453",
                                                "#EFEA5A",
                                                "#B9E769",
                                                "#83E377",
                                                "#16D893",
                                                "#0DB39E",
                                                "#048BA8"
                                            ],
                                            data: monthlyIncomes.map(i => i.amount)
                                        }
                                    ]
                                }}
                                option={{
                                    title: {
                                        display: false,
                                        text: ""
                                    }
                                }}
                            />
                        </Col>
                        <Col lg={6} md={6} s={12} xs={12}>
                            <div>Monthy Expenses</div>
                            <Doughnut
                                data={{
                                    labels: monthlyExpenses.map(i => i.label),
                                    datasets: [
                                        {
                                            label: "Expenses",
                                            backgroundColor: [
                                                "#277DA1",
                                                "#577590",
                                                "#4D908E",
                                                "#43AA8B",
                                                "#90BE6D",
                                                "#F9C74F",
                                                "#F9844A",
                                                "#F8961E"
                                            ],
                                            data: monthlyExpenses.map(i => i.amount)
                                        }
                                    ]
                                }}
                                option={{
                                    title: {
                                        display: false,
                                        text: ""
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="year" title="Year report">

                    <DropdownButton onSelect={handleFamily} title={family ? <span className="wallet-button">{family.name}</span> : <span className="wallet-button">Family</span>}>
                        {
                            familyList ? familyList.map(item =>
                                <DropdownItem eventKey={item.name} key={item._id} >{item.name}</DropdownItem>
                            ) : <div></div>
                        }
                    </DropdownButton>

                    <Container>
                        <Bar
                            data={{
                                labels: monthsOfYear,
                                datasets: [
                                    {
                                        label: "Incomes",
                                        backgroundColor: "#00CC00",
                                        data: yearIncomes
                                    }, {
                                        label: "Expenses",
                                        backgroundColor: "#CC0000",
                                        data: yearExpenses
                                    }
                                ]
                            }}
                            options={{
                                title: {
                                    display: true,
                                    text: "Report of 2020"
                                }
                            }}
                        />
                    </Container>
                </Tab>
            </Tabs>
        </div>
    )
}
