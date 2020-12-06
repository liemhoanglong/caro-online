import React from "react"
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export default function HomeScreen () 
{
    return(
        <React.Fragment>
            <div>Home</div>
            <Link to="/login" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Login</Button>
            </Link>

            <Link to="/register" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Register</Button>
            </Link>
        </React.Fragment>
    )
}