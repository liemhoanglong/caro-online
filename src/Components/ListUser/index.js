import React, {useEffect, useState} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {socket} from "../../Context/socket";
import getUserOnline from "./service";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 'auto',
            maxWidth: 360,
            maxHeight: 300,
            overflow: "auto",
            backgroundColor: theme.palette.background.paper,
        },
        paper:{
            maxWidth: 360,
        }
    }),
);

export default function UserList() {
    const [listUserOnline, setListUserOnline] = useState([]);
    const classes = useStyles();

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const res = await getUserOnline();
            setListUserOnline(res.data);
        }
        fetchData();
    },[])

    useEffect(() => {
        socket.on("user-connect", data => {
            setListUserOnline(data);
        })
    },[])

    useEffect(() => {
        socket.on("user-disconnect", data => {
            setListUserOnline(data);
        })
    }, [])

    const displayItem = () =>
    {
        const currentUsername = JSON.parse(localStorage.getItem("user"));
        const result = listUserOnline.filter((dl) => currentUsername.id !== dl.user.userID);
        return result.map((dl, index) => {
            return(
                <ListItem key={index} button>
                    <ListItemIcon>
                        <FiberManualRecordIcon style={{fill: "green"}}/>
                    </ListItemIcon>
                    <ListItemText primary={dl.user.username}/>
                </ListItem>
            )
        });
    }

    return (
        <Paper className={classes.paper} elevation={4}>
            <Typography variant="h6">
                Online users
            </Typography>
            <List component="nav" className={classes.root} aria-label="contacts">
                {displayItem()}
            </List>
        </Paper>
    );
}
