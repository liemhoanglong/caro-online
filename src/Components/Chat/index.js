import React, {useEffect, useRef, useState} from 'react';
import {Button, List, ListItem, ListItemText, Typography, Paper, Box, TextField} from "@material-ui/core"
import {socket} from "../../Context/socket";
import Grid from "@material-ui/core/Grid";

export default function ChatRoom()
{
    const [listMessage, setListMessage] = useState([]);
    const [newChat, setNewChat] = useState("");
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [listMessage]);

    useEffect(() => {
        const eventHandler = (data) => {
            setListMessage(listMessage.concat(data));
        }
        socket.on("chat", eventHandler);

        return () => {
            socket.off("chat", eventHandler);
        }
    },[listMessage])

    useEffect(() => {
        const eventHandler = (data) => {
            const user = data.audience[data.audience.length - 1];
            const currentUser = JSON.parse(localStorage.getItem("user"));
            if(user.username === currentUser.username)
            {
                setListMessage(listMessage.concat({username: "You", data: "joined room"}));
            }
            else setListMessage(listMessage.concat({username: user.username, data: "joined room"}));
        }

        socket.on("join-room-audience", eventHandler);

        return () => {
            socket.off("join-room-audience", eventHandler);
        }
    },[listMessage])

    useEffect(() => {
        const eventHandler = (data) => {
            setListMessage(listMessage.concat({username: data, data: "left room"}));
        }

        socket.on("chat-user-leave", eventHandler);

        return () => {
            socket.off("chat-user-leave", eventHandler);
        }
    },[listMessage])

    const sendMessage = () =>
    {
        if(newChat.length > 0)
        {
            const user = JSON.parse(localStorage.getItem("user"));
            const dataToSend = {username: user.username, data: newChat};
            const dataToRender = {username: "You", data: newChat};
            setListMessage(listMessage.concat(dataToRender));
            setNewChat("");
            socket.emit("chat", dataToSend);
        }
    }

    return(
        <React.Fragment>
            <Paper elevation={2}>
                <List component="nav" style={{height: 300, maxHeight: 300, overflow: "auto"}}>
                    {listMessage.map((dl, index) => {
                        return(
                            <ListItem key={index} dense={true}  >
                                <ListItemText>
                                    <Typography component='div' style={{overflowWrap: 'break-word'}} >
                                        <Box fontWeight='fontWeightBold' display='inline'>{`${dl.username}: `}</Box>
                                        {dl.data}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        )})}
                        <div ref={messageEndRef}/>
                </List>
                <Grid container alignContent="center" justify="space-between">
                   <Grid item>
                       <TextField id="filled-basic"
                                  label="Chat something..."
                                  fullWidth
                                  onChange={(e) => setNewChat(e.target.value)}
                                  value = {newChat}
                                  autoComplete="off"
                                  multiline
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

