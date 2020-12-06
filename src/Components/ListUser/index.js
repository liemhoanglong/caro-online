import React from "react"
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Container, List, ListItem, ListItemText } from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: '#E9ECEF',
        maxHeight: 300,
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function ListUser() {

    const users = [
        { id: 1, name: "long", isActive: 1 },
        { id: 2, name: "kha", isActive: 0 },
        { id: 3, name: "a", isActive: 1 },
        { id: 4, name: "b", isActive: 0 },
        { id: 5, name: "c", isActive: 1 },
        { id: 6, name: "d", isActive: 0 }
    ]

    let usersNow = users.filter(user => user.isActive === 1).concat(users.filter(user => user.isActive === 0))
    // console.log(usersNow) 

    const classes = useStyles();

    return (
        <Container>
            <List className={classes.root} component="nav" aria-label="main mailbox folders">
                {usersNow.map((user, i) => {
                    return (
                        <ListItem key={i} button style={{ borderRadius: "10px" }}>
                            {user.isActive === 1 ?
                                <ListItemIcon>
                                    <FiberManualRecordIcon style={{ fill: "green" }} />
                                </ListItemIcon>
                                :

                                <ListItemIcon>
                                    <FiberManualRecordIcon />
                                </ListItemIcon>
                            }
                            <ListItemText primary={user.name} />
                        </ListItem>
                    )
                })
                }
            </List>
        </Container>
    );
}