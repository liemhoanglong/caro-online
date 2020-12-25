import React, {useEffect, useState} from 'react';
import {Grid, Button, IconButton, Typography, 
    List, ListItem, ListItemText, Paper, Switch} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './game.css';
import Board from './board'
import Player from "./player";
import calculateWinner from "./gameCheck";
import ChatRoom from "../Chat"

import {socket, handleMove} from "../../Context/socket";

export default function Game() {
    const [size, setSize] = useState(10);
    const [history, setHistory] = useState([{squares: Array(size * size).fill(null)}])
    const [stepNumber, setStepNumber] = useState(0)

    const [isPlayerX, setIsPlayerX] = useState(true);
    const [isYourTurn, setIsYourTurn] = useState(true)
    const [isDes, setIsDes] = useState(true)

    useEffect(() => {
        const eventHandler = (data) => {
            const user = JSON.parse(localStorage.getItem("user"));
            if(data.playerO && data.playerO.userID === user.id) //if player is O
            {
                setIsYourTurn(false);
            }
            else if(data.playerX && data.playerX.userID === user.id) // if player is X
            {
                setIsYourTurn(true);
            }
            else // if player is audience
            {

            }
        }
        socket.on("join-room-player", eventHandler);

        return () => {
            socket.off("join-room-player", eventHandler);
        }
    })

    useEffect(() => {
        const eventHandler = (data) => {
            setHistory(data.history);
            setStepNumber(data.step);
            setIsPlayerX(!isPlayerX);
            setIsYourTurn(!isYourTurn);
        }

        socket.on("move", eventHandler);

        return () => {
            socket.off("move", eventHandler);
        }
    }, [isPlayerX, isYourTurn])

    const handleClick = (i) => {
        if(isYourTurn)
        {
            const history1 = history.slice(0, stepNumber + 1);
            const current = history1[history1.length - 1]
            const squares = current.squares.slice()
            if (calculateWinner(squares, current.location, size) || squares[i]) {
                return;
            }
            squares[i] = isPlayerX ? "X" : "O"
            const newHistory = history1.concat([{
                squares: squares,
                location: i
            }]);

            const newStepNumber = history1.length;
        
            setHistory(newHistory);
            setStepNumber(newStepNumber);
            setIsYourTurn(!isYourTurn);
            setIsPlayerX(!isPlayerX);

            handleMove(newHistory, newStepNumber);
        }
    }
    const sortHistory = () => {
        setIsDes(!isDes)
    }

    const location = (move) => {
        let row = Math.floor((move) / size) + 1
        let col = Math.floor((move) % size) + 1
        return ': row ' + row + ' col ' + col
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares, current.location, size);
    const moves = history.map((step, move) => {
        const desc = move ?
            'Move #' + move + location(history[move].location) :
            'Move #0: Game start';
        return (
            <ListItem button key={move}>
                {move === stepNumber ?
                    <ListItemText primary={desc}/>
                    :
                    <ListItemText primary={desc}/>
                }
            </ListItem>
        );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner.square;
    } else if (!current.squares.includes(null)) {
        status = "Draw";
    } else {
        status = isYourTurn ? "Your turn" : "Rival turn";
    }

    return (
        <div>
            <Grid container direction="column">
                <Grid container direction="row">
                    <Grid item xs={1}>
                        <IconButton>
                            <ArrowBackIcon style={{fontSize: 36}}/>
                        </IconButton>
                    </Grid>
                    <Grid container justify="center" alignItems="center" item xs={9}>
                        <Typography variant="h4">Phòng: 1</Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center" item xs={1}>
                        <Typography variant="h6">00:45</Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center" item xs={1}>
                        <Button variant="contained" color="primary" disableElevation>Mời bạn</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row"  style={{padding: 5}}>
                    <Grid container direction="column" item xs={2}>
                        <Grid container item justify="center" alignItems="center" spacing={2}>
                            <Player type="Bạn" elo={123} username={"hung123"}/>
                            <Grid container item xs={12} justify="center" alignItems="center">
                                <Typography variant="h3">VS.</Typography>
                            </Grid>
                            <Player type="Đối thủ" elo={456} username={"long123"}/>
                            <Grid container item xs={12} justify="center" alignItems="center">
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary"
                                            disableElevation fullWidth>Đầu hàng</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary"
                                            disableElevation fullWidth>Xin hòa</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={5} justify="center" alignItems="center">
                        <Board
                            winningSquares={winner ? winner.line : []}
                            squares={current.squares}
                            onClick={i => handleClick(i)}
                            size={size}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container>
                            <Grid container item xs={12} justify="center">
                                <Typography variant={"h4"}>{status}</Typography>
                            </Grid>
                            <Grid container>
                                <Grid container direction={"column"} item xs={6}>
                                    <Grid item container justify="space-between">
                                        <Typography variant={"h5"}>Lịch sử</Typography>
                                        <Switch onClick={() => sortHistory()} inputProps={{ 'aria-label': 'primary checkbox' }} />
                                    </Grid>
                                    <Grid item>
                                        <Paper elevation={2}>
                                            <List component="nav" style={{maxHeight: 300, overflow: "auto"}}>
                                                {isDes ? moves.reverse() : moves}
                                            </List>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"column"} item xs={6} zeroMinWidth wrap="nowrap">
                                    <ChatRoom/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

