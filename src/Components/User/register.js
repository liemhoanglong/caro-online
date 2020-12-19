import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect, Link} from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {signUpService} from "./Service/authService";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
        color: "#fff"
    },
    input: {
        fontSize: "15px"
    },
    labelInput:{
        fontSize: "15px"
    }
}));


export default function Register() {
    const [information, setInformation] = useState({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            rePassword: "",
        }
    )
    const [status, setStatus] = useState({type: "error", content: ""});
    const [alert, setAlert] = useState(false);
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(information.email.length === 0 || information.lastName.length === 0 || information.firstName.length === 0 ||
            information.password.length === 0 || information.rePassword.length === 0)
        {
            setStatus({type: "error", content: "Please fill all fields"})
            setAlert(true);
        }else if(information.password !== information.rePassword)
        {
            setStatus({type: "error", content: "Password not match"})
            setAlert(true);
        }
        else if(information.password.length < 6)
        {
            setStatus({type: "error", content: "Password at least 6 characters"})
            setAlert(true);
        }
        else {
            const res = await signUpService(information.username, information.firstName,information.lastName,
                information.password, information.email)
            if(res.data.err)
            {
                setStatus({type: "error", content: res.data.err});
                setAlert(true);
            }else if (res.data.msg)
            {
                setStatus({type: "success", content: res.data.msg});
                setAlert(true);
                //direct
                setIsSignUpSuccess(true);
            }
        }
    }

    if(isSignUpSuccess) return (<Redirect to="/login"/>)

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    InputLabelProps={{
                                        className: classes.labelInput
                                    }}
                                    onChange = {(e) => setInformation({...information, firstName: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    InputLabelProps={{
                                        className: classes.labelInput
                                    }}
                                    onChange = {(e) => setInformation({...information, lastName: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    InputLabelProps={{
                                        className: classes.labelInput
                                    }}
                                    onChange = {(e) => setInformation({...information, username: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    InputLabelProps={{
                                        className: classes.labelInput
                                    }}
                                    onChange = {(e) => setInformation({...information, email: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    InputLabelProps={{
                                        className: classes.labelInput
                                    }}
                                    onChange = {(e) => setInformation({...information, password: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="re-password"
                                    label="Re-Password"
                                    type="password"
                                    id="re-password"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    InputLabelProps={{
                                        className: classes.labelInput
                                    }}
                                    onChange = {(e) => setInformation({...information, rePassword: e.target.value})}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to='/login' variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>

    );
}