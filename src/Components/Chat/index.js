import React, {useEffect, useState} from 'react';
import {Button, List, ListItem, ListItemText, Typography, Paper, Box, TextField} from "@material-ui/core"
import {socket} from "../../Context/socket";
import Grid from "@material-ui/core/Grid";

export default function ChatRoom()
{
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const eventHandler = (data) => {
            setMessage(message.concat(data));
        }
        socket.on("chat", eventHandler);

        return () => {
            socket.off("chat", eventHandler);
        }
    },[message])

    const sendMessage = () =>
    {
        const user = JSON.parse(localStorage.getItem("user"));
        const dataOfSender = {username: user.username, data: newMessage};
        setMessage(message.concat(dataOfSender));
        setNewMessage("");
        socket.emit("chat", dataOfSender);
    }

    return(
        <React.Fragment>
            <Typography variant="h5">Chat</Typography>
            <Paper elevation={2}>
                <List component="nav" style={{height: 300, maxHeight: 300, overflow: "auto"}}>
                    {message.map((dl, index) => {
                        return(
                            <ListItem style={{maxHeight: 30}} key={index}   >
                                <ListItemText>
                                    <Typography component='div' noWrap >
                                        <Box fontWeight='fontWeightBold' display='inline'>{`${dl.username}: `}</Box>
                                        {dl.data}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        )})}
                </List>
                <Grid container alignContent="center" justify="space-between">
                   <Grid item>
                       <TextField id="filled-basic"
                                  label="Chat something..."
                                  fullWidth
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  value = {newMessage}

                       />
                   </Grid>
                    <Grid item xs={3}>
                        <Button onClick={sendMessage} variant="contained" color="primary" fullWidth>Send</Button>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}

