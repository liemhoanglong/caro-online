import React, {useState} from 'react';
import { Grid, Avatar, Button, Typography} from '@material-ui/core';
import {Redirect} from "react-router-dom"

import SearchRoom from "./searchRoom";
import ListUser from '../ListUser/index'
import {socket} from "../../Context/socket"
import ListRoom from "./listRoom";
import CreateRoom from "./createRoom";


export default function Lobby() {
    const [isDirectPage, setIsDirectPage] = useState(false);
    const [openNewRoom, setOpenNewRoom] = useState(false);


    const playNow = () =>
    {
        socket.emit("join-room");
        setIsDirectPage(true);
    }

    const createRoom = () =>
    {
        setOpenNewRoom(true);
        // socket.emit("create-room");
        // setIsDirectPage(true);
    }

    const handleCloseCreateRoom = () =>
    {
        setOpenNewRoom(false);
    }

    const handleAgreeCreateRoom = (password) =>
    {
        socket.emit("create-room", password);
        setIsDirectPage(true);
    }

    if(isDirectPage)
        return(
            <Redirect to="/game"/>
        )

    return (
        <React.Fragment>
            <Grid container>
                <Grid container item alignContent="flex-end" justify="flex-end" style={{margin: 5}}>
                    <SearchRoom/>
                    <Button variant="contained" color="primary" disableElevation onClick={playNow}>
                        Chơi ngay
                    </Button>
                    <Button variant="contained" color="primary" disableElevation onClick={createRoom}>
                        Tạo phòng
                    </Button>
                </Grid>
                <Grid container item  style={{margin: 5}}>
                    <Grid item xs={9}>
                        <ListRoom/>
                    </Grid>
                    <Grid direction="row" alignContent="center" container item xs = {3} >
                        <Grid item xs={12}>
                            <Avatar style={{width: 200, height: 200, fontSize: 100}}>H</Avatar>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Điểm: 1609</Typography>
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
        </React.Fragment>
    );
}
