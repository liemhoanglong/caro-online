import React, { useState, useEffect } from 'react';
import { Button, Container, Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import { useUserContext, useUpdateUserContext } from "../../Context/UserContext";
import userAPI from '../../Util/userAPI'

export default function Profile(props) {
    const userNow = useUserContext();
    const setUserNow = useUpdateUserContext();
    const [error, setError] = useState();
    const [error2, setError2] = useState();
    const [msg, setMsg] = useState();
    const [input, setInput] = useState({});
    const [input2, setInput2] = useState({});

    useEffect(() => {
        if (userNow.isLogin && userNow.user) {
            setInput({
                _id: userNow.user._id,
                firstName: userNow.user.firstName,
                lastName: userNow.user.lastName,
                username: userNow.user.username,
                email: userNow.user.email,
                password: "",
            })
        }
    }, [userNow.isLogin, userNow.user])

    console.log(userNow)

    const handleEditProfile = async (e) => {
        e.preventDefault();
        console.log(input);
        const res = await userAPI.editProfile(input);
        console.log(userNow)
        if (res.data.error) {
            setError(res.data.error);
        }
        else {
            setError('')
            setUserNow(userNow.isLogin, input);
        }
    }

    const handleChangePass = async (e) => {
        e.preventDefault();
        console.log(input2);
        if (input2.newpass ===input2.repass)
        {
            const res = await userAPI.changePass(input2);
            if (res.data.error) {
                console.log(res.data.error);
                setMsg('');
                setError2(res.data.error);
            }
            else {
                console.log(res.data);
                setError2('');
                setMsg(res.data.msg);
            }
        }
        else {
            setError2("The new password and retype password must be same!");
        }
    }

    if (!userNow.isLogin && !userNow.user) {
        return <></>
    }
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                    <h1>Edit profile</h1>
                    <form onSubmit={handleEditProfile}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Fisrt name"
                            value={input.firstName}
                            variant="outlined"
                            onChange={(e) =>
                                setInput({ ...input, firstName: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Last name"
                            value={input.lastName}
                            variant="outlined"
                            onChange={(e) =>{

                                setInput({ ...input, lastName: e.target.value })
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Username"
                            value={input.username}
                            variant="outlined"
                            disabled
                            onChange={(e) =>
                                setInput({ ...input, username: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email"
                            value={input.email}
                            variant="outlined"
                            disabled
                            onChange={(e) =>
                                setInput({ ...input, email: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Current password"
                            type="password"
                            value={input.password}
                            variant="outlined"
                            onChange={(e) =>
                                setInput({ ...input, password: e.target.value })}
                        />
                        {error ? <h4 style={{ color: 'red', margin: '5px 0' }}>{error}</h4> : null}
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{ margin: '20px 0' }}>
                            Edit profile
                        </Button>
                    </form>
                </Grid>
                <Grid item md={6} xs={12}>
                    <h1>Change password</h1>
                    <form onSubmit={handleChangePass}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Current password"
                            type="password"
                            value={input2.password}
                            variant="outlined"
                            onChange={(e) =>
                                setInput2({ ...input2, password: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="New password"
                            type="password"
                            value={input2.newpass}
                            variant="outlined"
                            onChange={(e) =>
                                setInput2({ ...input2, newpass: e.target.value })
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Retype password"
                            type="password"
                            value={input2.repass}
                            variant="outlined"
                            onChange={(e) =>{
                                setInput2({ ...input2, repass: e.target.value })}
                            }
                        />
                        {error2 ? <h4 style={{ color: 'red', margin: '5px 0' }}>{error2}</h4> : null}
                        {msg ? <h4 style={{ color: 'green', margin: '5px 0' }}>{msg}</h4> : null}
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{ margin: '20px 0' }}>
                            Change password
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}
