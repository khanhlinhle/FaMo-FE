import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Badge, Alert } from "react-bootstrap";
import axios from "axios";
import NumberFormat from 'react-number-format';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TransactionModal from './TransactionModal';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function WalletDetail(props) {

    const classes = useStyles();
    const [openExpenses, setOpenExpenses] = useState(true);
    const [openIncomes, setOpenIncomes] = useState(true);
    const [transactionModalShow, setTransactionModalShow] = useState(false);

    const handleClickExpenses = () => {
        setOpenExpenses(!openExpenses);
    };

    const handleClickIncomes = () => {
        setOpenIncomes(!openIncomes);
    };

    const [selectedIncome, setSelectedIncome] = useState(null)
    const [selectedExpense, setSelectedExpense] = useState(null)

    const [categoriesList, setCategoriesList] = useState([]);
    const [incomeList, setIncomeList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);

    const family = props.family;
    const wallet = props.wallet;

    useEffect(() => {
        getCategoriesList();
        if (family && wallet) {
            fetchWallet();
            fetchExpense();
            fetchIncome();
        }
    }, [wallet]);

    const getCategoriesList = async () => {
        try {
            const result = await axios.get(`https://localhost:5004/categories`);
            setCategoriesList(result.data.data);
        } catch (error) {
            return new Error(error.message);
        };
    };

    async function fetchExpense() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        };

        try {
            const res = await axios.get(`https://localhost:5004/family/${family._id}/wallets/${wallet._id}/expenses`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setExpenseList(res.data.data);
        } catch (error) {
            console.log(error)
        };
    };
    useEffect(() => {
        fetchWallet()
    }, [incomeList, expenseList]);

    async function fetchIncome() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        };

        try {
            const res = await axios.get(`https://localhost:5004/family/${family._id}/wallets/${wallet._id}/incomes`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setIncomeList(res.data.data);
        } catch (error) {
            console.log(error)
        };
    };

    async function fetchWallet() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        };

        try {
            const res = await axios.get(`https://localhost:5004/family/${family._id}/wallets/${wallet._id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setSelectedWallet(res.data.data);
        } catch (error) {
            console.log(error)
        };
    };
    const getColor = (type) => {
        if (type == "Cash") return "#168b9d"
        else if (type == "Bank") return "#f8bf33"
        else if (type == "Credit") return "#c8eaee"
    };
    console.log(expenseList)
    return (
        <div>
            {
                family && selectedWallet ?
                    <div className="list-part" style={{ backgroundColor: getColor(selectedWallet.type) }}>
                        <Alert variant="warning">
                            <div className="balance-part">
                                <div className="balance-title"><strong>Current Balance: </strong></div>
                                <div>
                                    {
                                        selectedWallet.balance < 0 ?
                                            <NumberFormat value={selectedWallet.balance} displayType={'text'} className="balance-title-size text-danger" thousandSeparator={true} prefix={'$'} /> :
                                            <NumberFormat value={selectedWallet.balance} displayType={'text'} className="balance-title-size text-success" thousandSeparator={true} prefix={'$'} />
                                    }
                                </div>
                            </div>
                        </Alert>
                        <Row>

                            <TransactionModal
                                expense={selectedExpense}
                                expenseList={expenseList}
                                setExpenseList={setExpenseList}
                                incomeList={incomeList}
                                setIncomeList={setIncomeList}
                                income={selectedIncome}
                                family={family}
                                wallet={wallet}
                                categoriesList={categoriesList}
                                show={transactionModalShow}
                                onHide={() => setTransactionModalShow(false)} />
                            <Col lg={6} md={6} s={12} xs={12}>
                                <List>
                                    <ListItem button onClick={handleClickExpenses}>
                                        <ListItemText>
                                            <Alert variant="danger">
                                                EXPENSES
                                            </Alert>
                                        </ListItemText>
                                        {openExpenses ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    {
                                        expenseList && expenseList.map(expense =>
                                            <Collapse in={openExpenses} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItem button onClick={() => {
                                                        setSelectedIncome(null);
                                                        setSelectedExpense(expense);
                                                        setTransactionModalShow(true);
                                                    }} className={classes.nested}>
                                                        <div className="expense-detail-part">
                                                            <div className="d-block">
                                                                <ListItemText primary={expense.description} />
                                                                <div className="text-muted">
                                                                    {
                                                                        categoriesList && categoriesList.find(item => item._id === expense.category).name
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <NumberFormat value={expense.amount} displayType={'text'} className="expense-title-size text-danger" thousandSeparator={true} prefix={'$'} />
                                                            </div>
                                                        </div>
                                                    </ListItem>
                                                </List>
                                            </Collapse>
                                        )
                                    }
                                </List>
                            </Col>
                            <Col lg={6} md={6} s={12} xs={12}>
                                <List>
                                    <ListItem button onClick={handleClickIncomes}>
                                        <ListItemText>
                                            <Alert variant="success">
                                                INCOMES
                                            </Alert>
                                        </ListItemText>
                                        {openIncomes ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    {
                                        incomeList && incomeList.map(income =>
                                            <Collapse in={openIncomes} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItem button onClick={() => {
                                                        setSelectedExpense(null);
                                                        setSelectedIncome(income);
                                                        setTransactionModalShow(true);
                                                    }} className={classes.nested}>
                                                        <div className="expense-detail-part">
                                                            <div className="d-block">
                                                                <ListItemText primary={income.description} />
                                                                <div className="text-muted">
                                                                    {
                                                                        categoriesList && categoriesList.find(item => item._id === income.category).name
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <NumberFormat value={income.amount} displayType={'text'} className="expense-title-size text-success" thousandSeparator={true} prefix={'$'} />
                                                            </div>
                                                        </div>
                                                    </ListItem>

                                                </List>
                                            </Collapse>
                                        )
                                    }
                                </List>
                            </Col>
                        </Row>
                    </div>
                    : ""
            }
        </div >
    );
};
