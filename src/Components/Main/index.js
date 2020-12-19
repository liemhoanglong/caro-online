import React from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

 export default function HomeScreen() {

    return (
        <React.Fragment>
            <Link to="/login" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Login</Button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Register</Button>
            </Link>
            <Link to="/lobby" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Lobby</Button>
            </Link>
            <Link to="/game" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Play Now</Button>
            </Link>
            <Link to="/testing" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Testing</Button>
            </Link>
        </React.Fragment>
    )
}