import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { resetPasswordService } from "./Service/authService";

import {
    Avatar, Button, Container,
    CssBaseline, TextField, Grid,
    Typography, Collapse
} from '@material-ui/core';


export default function ResetPassword(props) {
    console.log(props.match)
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);
    const [flag, setFlag] = useState(false);
    const [input, setInput] = useState({
        newpass: "",
        repass: "",
    });

    const handleReset = async (e) => {
        e.preventDefault();
        if(input.repass === input.newpass){
            let res = await resetPasswordService(props.match.params.id, input)
            console.log(res.data);
            setAlert(res.data.msg);
        }else{
            setError("New password and retype password doesn't same");
        }
    }

    if (flag) return (<Redirect to="/login" />)
    return (
        <div style={{ textAlign: "center" }}>
            {alert ?
                <>
                    <h2 style={{ color: "green" }}>Your {alert}.</h2>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setFlag(true)}
                    >
                        Login
                    </Button>
                </>
                :
                <Container>
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={0}></Grid>
                        <Grid item md={4} xs={12}>
                            <h2>Reset Password!</h2>
                            <form noValidate onSubmit={handleReset}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newpass"
                                    label="New Password"
                                    type="password"
                                    id="newpass"
                                    onChange={(e) =>
                                        setInput({ ...input, newpass: e.target.value })}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="repass"
                                    label="Retype Password"
                                    type="password"
                                    id="repass"
                                    onChange={(e) =>
                                        setInput({ ...input, repass: e.target.value })}
                                />
                                {error ? <h4 style={{ color: 'red', margin: '5px 0' }}>{error}</h4> : null}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit" 
                                    style={{ margin: '20px 0' }}
                                >
                                    Change
                        </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            }
        </div>
    );
}