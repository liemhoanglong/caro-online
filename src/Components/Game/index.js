import React, {useState} from 'react';
import {Grid, Button, IconButton, Typography} from '@material-ui/core';
import calculateWinner from "./gameCheck";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './game.css';
import Board from './board'
import Player from "./player";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";

const config = 16

export default function Game(){
    const [size, setSize] = useState(config);
    const [history, setHistory] = useState([{ squares: Array(size * size).fill(null), }])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)
    const [isDes, setIsDes] = useState(true)

    const handleClick = (i) => {
        const history2 = history.slice(0, stepNumber + 1);
        const current = history2[history2.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares, current.location, size) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(history2.concat([{
            squares: squares,
            location: i
        }]))
        setStepNumber(history2.length)
        setXIsNext(!xIsNext)
        setIsDes(true)
    }
    const sortHistory = () => {
        setIsDes(!isDes)
    }

    const location = (move) => {
        let r = Math.floor((move) / size) + 1
        let c = Math.floor((move) % size) + 1
        return ': row ' + r + ' col ' + c
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
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
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
                                <Grid container direction={"column"} item xs={6}>
                                    <Typography variant={"h5"}>Chat</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

