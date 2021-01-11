import React, {useState} from 'react';
import { Grid, Avatar, Button, Typography} from '@material-ui/core';
import {Redirect} from "react-router-dom"

import SearchRoom from "./searchRoom";
import ListUser from '../ListUser/index'
import {socket} from "../../Context/socket"
import ListRoom from "./ListRoom";
import CreateRoom from "./createRoom";
import {checkAvailableRoom} from "./service";


export default function Lobby() {
    const [isDirectPage, setIsDirectPage] = useState(false);
    const [openNewRoom, setOpenNewRoom] = useState(false);
    const [search, setSearch] = useState("");
    const [IDRoom, setIDRoom] = useState("");



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
        // socket.emit("create-room");
        // setIsDirectPage(true);
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
                    <Grid direction="row" alignContent="center" container item xs = {3} >
                        <Grid item xs={12}>
                            <Avatar style={{width: 200, height: 200, fontSize: 100}}>H</Avatar>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{`countdown`}</Typography>
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
