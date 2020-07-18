import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { ListItemAvatar, Avatar } from '@material-ui/core';
import { Row, Col, Container } from "react-bootstrap"

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

export default function NestedList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Container>
            <Row>
                <Col lg={6} md={6} s={12} xs={12}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Expense
                            </ListSubheader>
                        }
                        className={classes.root}
                    >
                        <ListItem button onClick={handleClick}>
                            <ListItemAvatar>
                                <Avatar alt="Shopping" src="https://image.freepik.com/free-vector/paper-bag_53876-59967.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Shopping" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemAvatar>
                                        <Avatar alt="Shopping" src="https://img.freepik.com/free-vector/shop-building-vector-icon-illustration-building-landmark-icon-concept_138676-428.jpg?size=626&ext=jpg&ga=GA1.2.305931107.1594373996" />
                                    </ListItemAvatar>
                                    <ListItemText primary="Market / Supermarket" />
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemAvatar>
                                        <Avatar alt="Shopping" src="https://image.freepik.com/free-vector/shopping-bag-icon-illustration_24640-50313.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText primary="Clothes" />
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemAvatar>
                                        <Avatar alt="Shopping" src="https://image.freepik.com/free-vector/smartphone-concept-illustration_114360-265.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText primary="Technology equipment / App" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Col>
            </Row>
        </Container>
    );
};
