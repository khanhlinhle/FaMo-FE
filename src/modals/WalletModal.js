import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Container, Badge, Alert } from "react-bootstrap";
import axios from "axios";
import NumberFormat from 'react-number-format';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

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

export default function WalletModal(props) {

    const classes = useStyles();
    const [openExpenses, setOpenExpenses] = useState(true);
    const [openIncomes, setOpenIncomes] = useState(true);

    const handleClickExpenses = () => {
        setOpenExpenses(!openExpenses);
    };

    const handleClickIncomes = () => {
        setOpenIncomes(!openIncomes);
    };

    const [incomeList, setIncomeList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [categoriesList, setCategoriesList] = useState([]);

    const family = props.family;
    const wallet = props.wallet;
    console.log('wallet', wallet)
    useEffect(() => {
        fetchExpense();
        fetchIncome();
        fetchWallet();
        getCategoriesList();
    }, []);

    const getCategoriesList = async () => {
        try {
            const result = await axios.get(`https://localhost:5004/categories`);
            setCategoriesList(result.data.data);
        } catch (error) {
            return new Error(error.response.message);
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
            //console.log("expense list", res);
            setExpenseList(res.data.data);
        } catch (error) {
            console.log(error)
        };
    };

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
            //console.log("income list", res);
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
            //console.log("wallet selected", res.data.data);
            setSelectedWallet(res.data.data);
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <div>
            {
                selectedWallet ?
                    <Modal
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" className="modal-title">{selectedWallet.type}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Alert variant="warning">
                                    <div className="balance-title"><strong>Current Balance: </strong></div>
                                    {
                                        selectedWallet.balance < 0 ?
                                            <NumberFormat value={selectedWallet.balance} displayType={'text'} className="balance-title-size text-danger" thousandSeparator={true} prefix={'$'} /> :
                                            <NumberFormat value={selectedWallet.balance} displayType={'text'} className="balance-title-size text-success" thousandSeparator={true} prefix={'$'} />
                                    }
                                </Alert>
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
                                                    <ListItem button className={classes.nested}>
                                                        <div className="expense-detail-part">
                                                            <div className="d-block">
                                                                <ListItemText primary={expense.description} />
                                                                <div className="text-muted">
                                                                    {/* {
                                                                        categoriesList && categoriesList.find(item => item._id === expense.category).name
                                                                    } */}
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
                                                    <ListItem button className={classes.nested}>
                                                        <div className="expense-detail-part">
                                                            <div className="d-block">
                                                                <ListItemText primary={income.description} />
                                                                <div className="text-muted">
                                                                    {/* {
                                                                        categoriesList && categoriesList.find(item => item._id === income.category).name
                                                                    } */}
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
                            </Container>
                        </Modal.Body>
                    </Modal>
                    : ""
            }
        </div >
    );
};
