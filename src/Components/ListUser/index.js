import React, {useEffect, useState} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from "@material-ui/core/Paper";
import {CardActionArea, Grid, Typography} from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {socket} from "../../Context/socket";
import getUserOnline from "./service";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxHeight: 300,
            overflow: "auto",
            marginTop: 10,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export default function UserList({type, id, invitee, handleClose}) {
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
        const eventHandler = (data) => setListUserOnline(data);
        socket.on("user-connect", eventHandler);

        return () => {
            socket.off("user-connect", eventHandler);
        }
    },[])

    useEffect(() => {
        const eventHandler = (data) => setListUserOnline(data);
        socket.on("user-disconnect", eventHandler);

        return () => {
            socket.off("user-disconnect", eventHandler);
        }
    }, [])

    const handleClick = (dl) =>
    {
        handleClose();
        socket.emit("invite-friend", {id: id, invitee: invitee, to: dl.user.username })
    }

    const displayItem = () =>
    {
        const currentUsername = JSON.parse(localStorage.getItem("user"));
        const result = listUserOnline.filter((dl) => currentUsername.id !== dl.user.userID);
        return result.map((dl, index) => {
            return(
                <ListItem key={index} dense>
                    <ListItemIcon>
                        <FiberManualRecordIcon style={{fill: "green"}}/>
                    </ListItemIcon>
                    <ListItemText primary={dl.user.username}/>
                    {type > 0 ?
                        <Button style={{marginLeft: 150}} variant="contained" color="primary"
                                disableElevation
                                onClick={() => handleClick(dl)}
                        >Invite friend</Button>
                        : <></>
                    }
                </ListItem>
            )
        });
    }

    return (
        <React.Fragment>
            {listUserOnline.length > 1 ?
                <React.Fragment>
                    <Paper elevation={1} style={{backgroundColor: "#F5F5F5"}}>
                        <List component="nav" className={classes.root}>
                            {displayItem()}
                        </List>
                    </Paper>
                </React.Fragment>
                :
                <Grid container justify="center" alignContent="center">
                    <Card  elevation={3} style={{maxHeight: 200, width: "100%", marginTop: 10, backgroundColor: "#F5F5F5"}}>
                        <CardActionArea style={{paddingTop: 50, paddingBottom: 50}}>
                            <Grid justify="center" alignContent="center" container>
                                <Typography variant="h5">No user online...</Typography>
                            </Grid>
                        </CardActionArea>
                    </Card>
                </Grid>
            }
        </React.Fragment>
    );
}
