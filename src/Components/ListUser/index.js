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

export default function ListUser(props) {
    console.log(props.listUserNow)
    const userOnline = props.listUserNow.reduce((a, o) => (a.push(o.userID), a), [])
    console.log(userOnline)
    // const userOnline = [1,2,3];
    // const listUser = [10, 11, 12];
    const classes = useStyles();

    return (
        <Container>
            <List className={classes.root} component="nav" aria-label="main mailbox folders">
                {props.listUser.map((user, i) => { // props.listUser.map ....
                    return (
                        <ListItem key={i} button style={{ borderRadius: "10px" }}>
                            { userOnline.includes(user.id) ?
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