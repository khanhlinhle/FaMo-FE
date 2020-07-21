import React, { useState, useEffect } from 'react';
import { Col, Button, Card, Row, Container } from "react-bootstrap";
import ExpenseModal from "./../modals/ExpenseModal";
import IncomeModal from "./../modals/IncomeModal";
import Moment from 'react-moment';
import moment from 'moment';
import { Bar } from "react-chartjs-2";
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

    const [familyList, setFamilyList] = useState(null);
    const [categoriesList, setCategoriesList] = useState(null);
    const [yearIncomes, setYearIncomes] = useState([]);
    const [yearExpenses, setYearExpenses] = useState([]);

    const getCategoriesList = async () => {
        try {
            const res = await axios.get(`https://localhost:5004/categories`);
            setCategoriesList(res.data.data);
        } catch (error) {
            return new Error(error.response.message);
        };
    };

    const getFamilyList = async () => {
        if (!token) {
            return;
        };

        try {
            const res = await axios.get(`https://localhost:5004/family`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setFamilyList(res.data.data);
            getIncomesAndExpenses(res.data.data);
        } catch (error) {
            console.log(error)
        };
    };

    const getIncomesAndExpenses = async (families) => {
        if (!token) {
            return;
        };

        try {
            const resIn = await axios.post(`https://localhost:5004/family/incomes/report`,
                {
                    wallets: families[0].wallets,
                },
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

            const resEx = await axios.post(`https://localhost:5004/family/expenses/report`,
                {
                    wallets: families[0].wallets,
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


        } catch (error) {
            console.log(error)
        };
    };

    useEffect(() => {
        getCategoriesList();
        getFamilyList();
    }, []);

    return (
        <Container>
            {/* // In year */}
            <Bar
                data={{
                    labels: monthsOfYear,
                    datasets: [
                        {
                            label: "Incomes",
                            backgroundColor: "#3e95cd",
                            data: yearIncomes
                        }, {
                            label: "Expenses",
                            backgroundColor: "#8e5ea2",
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
    )
}
