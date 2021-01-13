import React, {useEffect, useState} from 'react';
import {Grid, Avatar, Button, Typography, Box, Divider} from '@material-ui/core';
import {Redirect} from "react-router-dom"

import SearchRoom from "./searchRoom";
import ListUser from '../ListUser/index'
import {socket} from "../../Context/socket"
import ListRoom from "./ListRoom";
import CreateRoom from "./createRoom";
import {checkAvailableRoom} from "./service";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Paper from "@material-ui/core/Paper";
import callAPI from "../../Util/callAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Lobby() {
    const [isDirectPage, setIsDirectPage] = useState(false);
    const [openNewRoom, setOpenNewRoom] = useState(false);
    const [search, setSearch] = useState("");
    const [IDRoom, setIDRoom] = useState("");
    const [isInvite, setIsInvite] = useState(false);
    const [inviteeInfo, setInviteeInfo] = useState({id: "", invitee:"", to: ""});
    const [userData, setUserData] = useState({match: 0, win: 0, winRate: 0, username: "", elo: 1000, position: 1})

    useEffect(()=>{
       const inviteComing = (data) =>
       {
           const user = JSON.parse(localStorage.getItem("user"));
           if(user.username === data.to)
           {
               setIDRoom(data.id)
               setInviteeInfo(data);
               setIsInvite(true);
           }
       }
       socket.on("invite-friend", inviteComing);
       return () => socket.off("invite-friend", inviteComing);
    },[])

    useEffect(() => {
        const fetchDataUser = async () =>{
            const res = await callAPI("GET", "users/getStats","");
            setUserData(res.data);
        }
        fetchDataUser();
    },[])

    const playNow = async () =>
    {
        const res = await checkAvailableRoom();
        let id = res.data.msg;
        if( id === false)
        {
            const user = JSON.parse(localStorage.getItem("user"));
            const random = Math.floor(Math.random() * 1000)
            id = user.username + "_"+random;
        }
        socket.emit("play-now", {id, password: "", timing: 45});
        setIDRoom(id);
        setIsDirectPage(true);
    }

    const createRoom = () =>
    {
        setOpenNewRoom(true);
    }

    const handleCloseCreateRoom = () =>
    {
        setOpenNewRoom(false);
    }

    const handleAgreeCreateRoom = (password, timing) =>
    {
        const user = JSON.parse(localStorage.getItem("user"));
        const random = Math.floor(Math.random() * 1000)
        const id = user.username + "_"+random;
        setIDRoom(id);
        socket.emit("create-room", {id, password, timing});

        setIsDirectPage(true);
    }

    const searchRoom = (text) =>
    {
        setSearch(text);
    }

    const Confirm = () =>
    {
        setIsDirectPage(true);
        socket.emit("join-room-id", inviteeInfo.id);
    }

    const DisConfirm = () =>
    {
        setIsInvite(false);
    }

    if(isDirectPage)
        return(
            <Redirect to={`/game/${IDRoom}`}/>
        )

    return (
        <React.Fragment>
            <Grid container style={{padding: 10}}>
                <Grid container item alignContent="space-between" justify="space-between" >
                    <Grid item xs={6}>
                        <SearchRoom handleChange={searchRoom}/>
                    </Grid>
                    <Grid item container xs={6} justify="flex-end" alignContent="center" spacing={2}>
                        <Grid item>
                            <Button variant="contained" color="primary" disableElevation onClick={playNow}>
                                Quick play
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" disableElevation onClick={createRoom}>
                                Create a room
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item  style={{marginTop: 5}}>
                    <Grid item xs={9}>
                        <ListRoom search={search}/>
                    </Grid>
                    <Grid direction="row" alignContent="center" container item xs = {3} style={{paddingLeft: 10}}>
                        <Paper style={{width: "100%"}}>
                            <Grid container>
                                <Grid container xs={5} item justify="center" style={{ paddingTop: 10}}>
                                    <Avatar style={{width: 120, height: 120, fontSize: 72}}>{userData.username ? userData.username.charAt(0).toUpperCase() : ""}</Avatar>
                                    <Grid container item alignContent="center" justify="center">
                                        <Box fontWeight='fontWeightBold' display='inline'  style={{ fontSize: 18, padding: 5}}>{userData.username}</Box>
                                    </Grid>
                                </Grid>
                                <Divider orientation="vertical" flexItem/>
                                <Grid container item xs={6} justify="center">
                                    <Box fontWeight='fontWeightBold' display='inline' style={{fontSize: 18, padding: 5, paddingLeft: 10}}>Your stats</Box>
                                    <Grid item container justify="space-between" style={{paddingLeft: 10}}>
                                        <Grid item><Box fontWeight='fontWeightBold' display='inline'>Elo score:</Box> {userData.elo}</Grid>
                                        <Grid item><Box fontWeight='fontWeightBold' display='inline'>Top:</Box> {userData.position}</Grid>
                                    </Grid>
                                    <Grid item container style={{padding: 5, paddingLeft: 10}}>
                                        <Grid item xs={12}><Box fontWeight='fontWeightBold' display='inline'>Total matches:</Box> {userData.match}</Grid>
                                        <Grid item xs={12}><Box fontWeight='fontWeightBold' display='inline'>Total win:</Box> {userData.win}</Grid>
                                        <Grid item xs={12}><Box fontWeight='fontWeightBold' display='inline'>Win rate:</Box> {userData.winRate}%</Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Grid item container alignContent="center" justify="center" style={{marginTop: 20}}>
                            <Box fontWeight='fontWeightBold' display='inline' style={{fontSize: 18}}>Online users</Box>
                        </Grid>
                        <Grid item xs={12}>
                            <ListUser/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CreateRoom open={openNewRoom}
                        handleClose={handleCloseCreateRoom}
                        handleAgree = {handleAgreeCreateRoom}/>
            <Dialog open={isInvite}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={DisConfirm}>
                <DialogTitle>
                    You have a message
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        <Box fontWeight='fontWeightBold' display='inline'>{`${inviteeInfo.invitee} `}</Box>
                        {"invite you join to room "}
                        <Box fontWeight='fontWeightBold' display='inline'>{`${inviteeInfo.id} `}</Box>
                    </Typography>
                    <Typography variant="h6">
                        {"Do you want to join this room?"}
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button onClick={DisConfirm} color="primary">
                        Close
                    </Button>
                    <Button onClick={Confirm} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
