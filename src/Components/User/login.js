import React, {useState} from 'react';
import {Redirect, Link} from "react-router-dom";
import { makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import {useUpdateUserContext} from "../../Context/UserContext";
import {userLogin} from "../../Context/socket";
import {loginService} from "./Service/authService";

import {Avatar, Button, Container,
    CssBaseline, TextField, Grid,
    Typography, Collapse}  from '@material-ui/core';

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

export default function LogIn() {
    const [input, setInput] = useState({
        user: "",
        password: "",
    });
    const [status, setStatus] = useState({type: "error", content:""});
    const [alert, setAlert] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const updateUser = useUpdateUserContext();
    const classes = useStyles();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if(input.user.length === 0 || input.password.length === 0)
        {
            setStatus({type: "error", content: "Please enter username or password"})
            setAlert(true);
        }
        else {
            const res = await loginService(input.user, input.password);
            console.log(res);
            if(res.error)
            {
                setStatus({type: "error", content: res.error})
                setAlert(true);
            }
            else //login success
            {
                updateUser(true, null);
                userLogin(res.id, res.username);
                setIsLogin(true);
            }
        }
    }

    if(isLogin) return(<Redirect to ="/"/>);

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Collapse in={alert}>
                        <Alert severity={status.type}
                               action={
                                   <IconButton
                                       aria-label="close"
                                       color="inherit"
                                       size="small"
                                       onClick={() => {
                                           setAlert(false);
                                       }}
                                   >
                                       <CloseIcon fontSize="inherit" />
                                   </IconButton>
                               }
                        >
                            {status.content}
                        </Alert>
                    </Collapse>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={(e) =>
                                setInput({...input, user: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(e)=>
                                setInput({...input, password: e.target.value})}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container style={{marginTop: 10}}>
                            <Grid item xs>
                                <Link to="/login" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    Don't have an account? Register
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
}