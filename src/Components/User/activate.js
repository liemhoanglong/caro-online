import React, { useState } from 'react';
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import { useUpdateUserContext } from "../../Context/UserContext";
import { userLogin } from "../../Context/socket";
import { activateService } from "./Service/authService";

import {
    Avatar, Button, Container,
    CssBaseline, TextField, Grid,
    Typography, Collapse
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: "#fff"
    },
}));

export default function Activate(props) {
    const [alert, setAlert] = useState(false);
    const [flag, setFlag] = useState(false);

    const handleActivated = async () => {
        // setAlert("Your account have been activated!")
        let res = await activateService(props.match.params.id)
        console.log(res.data);
        setAlert(res.data.msg);
    }

    if(flag) return (<Redirect to="/login"/>)
    return (
        <div style={{ textAlign: "center" }}>
            {alert ?
                <>
                    <h2 style={{ color: "green" }}>Your account had been {alert}.</h2>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>setFlag(true)}
                    >
                        Login
                    </Button>
                </>
                :
                <>
                    <h2>Please click the link below!</h2>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleActivated}
                    >
                        Acitvate
                    </Button>
                </>
            }
        </div>
    );
}