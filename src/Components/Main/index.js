import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { useUserContext } from "../../Context/UserContext";
import Crown from '../IconSVG/Crown';
import sasuke from '../IconSVG/sasuke.png';
import History from '../IconSVG/History';
import Lobby from '../IconSVG/Lobby';
import Play from '../IconSVG/Play';
import { checkAvailableRoom } from "../Lobby/service";
import { socket } from '../../Context/socket'

export default function HomeScreen() {
    const loginState = useUserContext();
    const [isDirectPage, setIsDirectPage] = useState(false);
    const [IDRoom, setIDRoom] = useState("");

    const playNow = async () => {
        const res = await checkAvailableRoom();
        let id = res.data.msg;
        if (id === false) {
            const user = JSON.parse(localStorage.getItem("user"));
            const random = Math.floor(Math.random() * 1000)
            id = user.username + "_" + random;
        }
        socket.emit("play-now", { id, password: "", timing: 45 });
        setIDRoom(id);
        setIsDirectPage(true);
    }

    if (isDirectPage)
        return (
            <Redirect to={`/game/${IDRoom}`} />
        )

    return (
        <React.Fragment>
            <Grid container>
                <Hidden smDown>
                    <Grid item md={4} style={{ textAlign: "right" }}>
                        <img src="https://i.pinimg.com/originals/9e/c6/e1/9ec6e148fd1a2a3c7a3eb6e4fbee48ba.png" alt="Girl in a jacket" width={200} style={{ marginTop: 30 }} />
                    </Grid>
                </Hidden>
                <Grid item sm={12} md={4}>
                    {!loginState.isLogin ?
                        <div style={{ margin: 20 }}>
                            <Link to="/login" className='link-custom'>
                                <Button fullWidth className='btn-home-sceen'>Login</Button>
                            </Link>
                            <Link to="/register" className='link-custom'>
                                <Button fullWidth className='btn-home-sceen'>Register</Button>
                            </Link>
                            <Link to="/leaderboard" className='link-custom'>
                                <Button fullWidth className='btn-home-sceen'>Leaderboard<Crown width='30px' height='30px' style={{ marginLeft: 10 }} /></Button>
                            </Link>
                        </div>
                        :
                        <div style={{ margin: 20 }}>
                            <Link to="/leaderboard" className='link-custom'>
                                <Button fullWidth className='btn-home-sceen'>Leaderboard<Crown width='30px' height='30px' style={{ marginLeft: 10 }} /></Button>
                            </Link>
                            <Link to="/lobby" className='link-custom'>
                                <Button fullWidth className='btn-home-sceen'>Lobby<Lobby width='30px' height='30px' style={{ marginLeft: 10 }} /></Button>
                            </Link>
                            <Button fullWidth onClick={playNow} className='btn-home-sceen'>Play Now<Play width='30px' height='30px' style={{ marginLeft: 10 }} /></Button>
                            <Link to="/history" className='link-custom'>
                                <Button fullWidth className='btn-home-sceen'>History<History width='30px' height='30px' style={{ marginLeft: 10 }} /></Button>
                            </Link>
                        </div>
                    }

                </Grid>
                <Hidden smDown>
                    <Grid item md={4}>
                        <img src={sasuke} alt="Girl in a jacket" width={250} style={{ marginTop: 44 }} />
                    </Grid>
                </Hidden>
            </Grid>

        </React.Fragment>
    )
}