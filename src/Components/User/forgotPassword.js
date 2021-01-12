import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { forgotPasswordService } from "./Service/authService";

import {
    Avatar, Button, Container,
    CssBaseline, TextField, Grid,
    Typography, Collapse
} from '@material-ui/core';


export default function ForgotPassword(props) {
    console.log(props.match)
    const [alert, setAlert] = useState(false);
    const [input, setInput] = useState({email:""});

    const handleReset = async (e) => {
        e.preventDefault();
        let res = await forgotPasswordService(input)
        console.log(res.data);
        setAlert(res.data.msg);
    }

    return (
        <div style={{ textAlign: "center" }}>
            {alert ?
                <>
                    <h2 style={{ color: "green" }}>Please check your email!</h2>
                </>
                :
                <Container>
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={0}></Grid>
                        <Grid item md={4} xs={12}>
                            <h2>Forgot Password!</h2>
                            <form validate onSubmit={handleReset}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Your email"
                                    type="email"
                                    id="email"
                                    onChange={(e) =>
                                        setInput({ ...input, email: e.target.value })}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    style={{ margin: '20px 0' }}
                                >
                                    Send
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            }
        </div>
    );
}