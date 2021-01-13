import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { useUserContext } from "../../Context/UserContext";
import Crown from '../IconSVG/Crown';
import History from '../IconSVG/History';
import Lobby from '../IconSVG/Lobby';
import Play from '../IconSVG/Play';

export default function HomeScreen() {
    const loginState = useUserContext();

    return (
        <React.Fragment>
            <Grid container>
                <Hidden smDown>
                    <Grid item md={4} style={{ textAlign: "right" }}>
                        <img src="https://i.pinimg.com/originals/9e/c6/e1/9ec6e148fd1a2a3c7a3eb6e4fbee48ba.png" alt="Girl in a jacket" width={200} style={{marginTop: 30}}/>
                    </Grid>
                </Hidden>
                <Grid item sm={12} md={4}>
                    {!loginState.isLogin ?
                        <>
                            <Link to="/login" style={{ textDecoration: 'none', color: "inherit" }}>
                                <Button fullWidth style={{ textTransform: "none", backgroundColor: "#239478", color: "#fff", padding: 20, marginTop: 40, fontSize: 25 }}>Login</Button>
                            </Link>
                            <Link to="/register" style={{ textDecoration: 'none', color: "inherit" }}>
                                <Button fullWidth style={{ textTransform: "none", backgroundColor: "#239478", color: "#fff", padding: 20, marginTop: 40, fontSize: 25 }}>Register</Button>
                            </Link>
                            <Link to="/leaderboard" style={{ textDecoration: 'none', color: "inherit" }}>
                                <Button fullWidth style={{ textTransform: "none", backgroundColor: "#239478", color: "#fff", padding: 20, marginTop: 40, fontSize: 25 }}>Leaderboard<Crown width='30px' height='30px' style={{marginLeft: 10}}/></Button>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/leaderboard" style={{ textDecoration: 'none', color: "inherit" }}>
                                <Button fullWidth style={{ textTransform: "none", backgroundColor: "#239478", color: "#fff", padding: 20, marginTop: 40, fontSize: 25 }}>Leaderboard<Crown width='30px' height='30px' style={{marginLeft: 10}}/></Button>
                            </Link>
                            <Link to="/lobby" style={{ textDecoration: 'none', color: "inherit" }}>
                                <Button fullWidth style={{ textTransform: "none", backgroundColor: "#239478", color: "#fff", padding: 20, marginTop: 40, fontSize: 25 }}>Lobby<Lobby width='30px' height='30px' style={{marginLeft: 10}}/></Button>
                            </Link>
                            <Link to="/game" style={{ textDecoration: 'none', color: "inherit" }}>
                                <Button fullWidth style={{ textTransform: "none", backgroundColor: "#239478", color: "#fff", padding: 20, marginTop: 40, fontSize: 25 }}>Play Now<Play width='30px' height='30px' style={{marginLeft: 10}}/></Button>
                            </Link>
                            <Link to="/history" style={{ textDecoration: 'none', color: "inherit" }}>
                                <Button fullWidth style={{ textTransform: "none", backgroundColor: "#239478", color: "#fff", padding: 20, marginTop: 40, fontSize: 25 }}>History<History width='30px' height='30px' style={{marginLeft: 10}}/></Button>
                            </Link>
                        </>
                    }

                </Grid>
                <Hidden smDown>
                    <Grid item md={4}>
                        <img src="https://lh3.googleusercontent.com/proxy/q6tISMAunB7ewOuuPgVujx2qI46CGAvXXCXCyKNy3qaagcw55OAhzIiAmew3zII6eV5q1cRf2GYepvHofS9_Sey2_lH2FAGq3NL58BCLVwgrUnBpnUnPJ48VWPwOkw" alt="Girl in a jacket" width={250} style={{marginTop: 30}}/>
                    </Grid>
                </Hidden>
            </Grid>

        </React.Fragment>
    )
}