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

const size = 10;

export default function Game() {
    // const [size, setSize] = useState(10);
    const [history, setHistory] = useState([{squares: Array(size * size).fill(null)}])
    const [stepNumber, setStepNumber] = useState(0)

    const [displayRenderX, setDisplayRenderX] = useState(true);
    const [isYourTurn, setIsYourTurn] = useState(true);

    const [gameInfo, setGameInfo] = useState({});
    const [playerType, setPlayerType] = useState("");

    const [isGameOver, setIsGameOver] = useState(false); // game end by win, lose or draw
    // game end by player out room
    const [isPlayerOut, setIsPlayerOut] = useState(false);

    const [isDes, setIsDes] = useState(true)

    useEffect(() => {
        const joinRoomPlayer = (data) => {
            console.log(data);
            setGameInfo(data);
            const user = JSON.parse(localStorage.getItem("user"));
            if(data.playerO && data.playerO.userID === user.id) //if player is O
            {
                setIsYourTurn(false);
                setPlayerType("O");
                setIsPlayerOut(false);
            }
            else if(data.playerX && data.playerX.userID === user.id) // if player is X
            {
                setIsYourTurn(true);
                setPlayerType("X");
                setIsPlayerOut(false);
            }
            else // if player is audience
            {
                setPlayerType("A");
            }
        }
        socket.on("join-room-player", joinRoomPlayer);

        return () => {
            socket.off("join-room-player", joinRoomPlayer);
        }
    })

    useEffect(() => {
        const move = (data) => {
            setHistory(data.history);
            setStepNumber(data.step);
            setDisplayRenderX(!displayRenderX);
            setIsYourTurn(!isYourTurn);
        }

        socket.on("move", move);

        return () => {
            socket.off("move", move);
        }
    }, [displayRenderX, isYourTurn])

    useEffect(() =>{
        const roomChange = (data) =>
        {
            setGameInfo(data);
        }

        socket.on("room-change", roomChange);

        return () => socket.off("room-change", roomChange);
    },[])

    useEffect(() => {
        const roomChangePlayer = (data) =>
        {
            setGameInfo(data);
            setIsPlayerOut(true);
        }

        socket.on("room-change-player", roomChangePlayer);

        return () => socket.off("room-change-player", roomChangePlayer);
    },[])


    const handleClick = (i) => {
        if(gameInfo.isStart && isYourTurn && playerType !== "A")
        {
            const history1 = history.slice(0, stepNumber + 1);
            const current = history1[history1.length - 1]
            const squares = current.squares.slice()
            if (calculateWinner(squares, current.location, size) || squares[i]) {
                return;
            }
            squares[i] = displayRenderX ? "X" : "O"
            const newHistory = history1.concat([{
                squares: squares,
                location: i
            }]);

            const newStepNumber = history1.length;
        
            setHistory(newHistory);
            setStepNumber(newStepNumber);
            setIsYourTurn(!isYourTurn);
            setDisplayRenderX(!displayRenderX);

            handleMove(newHistory, newStepNumber);
        }
    }

    const sortHistory = () => {
        setIsDes(!isDes)
    }

    const startGame = () =>
    {
        setGameInfo({...gameInfo, isStart: true});
        socket.emit("play-game", gameInfo.id);
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

    const renderTurn = () =>
    {
        if(playerType === "A") // type = audience
        {
            //do ???
        }
        else
        {
            if(isYourTurn)
                return (
                    <>
                    {"Your turn "}
                    <span style={{color: 'red'}}>{playerType}</span>
                        </>);
            else
            {
                const opposite = playerType === "X"? "O" : "X";
                return("Rival turn (" + opposite + ")")
            }
        }
    }

    const renderWinner = (who) =>
    {
        if(who === "X")
        {
            if(playerType === "X") return "You WIN";
            else if (playerType === "O") return "You lose";
            else return gameInfo.playerX.username + " win";
        }else if (who ==="O")
        {
            if(playerType === "O") return "You lose";
            else if(playerType === "X") return "You WIN";
            else return gameInfo.playerO.username + " win";
        }
    }

    const renderPlayer1 = () =>
    {
        //player is X
        if (playerType === "X")
            return (<Player status={1} type="You (X)" player={gameInfo.playerX} />);
        //player is O
        else if (playerType === "O")
        {
            return (<Player status={1} type="You (O)" player={gameInfo.playerO} />)
        }
        // is audience
        else
        {
            if(gameInfo.playerX)
                return (<Player status={1} type={`${gameInfo.playerX.username} (X)`} player={gameInfo.playerX} />)
            else return (<Player status={0} player=""/>);
        }
    }

    const renderPlayer2 = () =>
    {
        if(isPlayerOut)
        {
            if(gameInfo.isStart)
                return (<Player status={-1} type="" player={""}/>)
            else
                return (<Player status={0} type="" player={""}/>)
        }
        //player is X
        if (playerType === "X")
        {
            if(gameInfo.playerO)
                return (<Player status={1} type="Rival (O)" player={gameInfo.playerO} />);
            else return (<Player status={0} type="" player=""/>);
        }
        //player is O
        else if (playerType === "O")
        {
            if(gameInfo.playerX)
                return (<Player status={1} type="Rival (X)" player={gameInfo.playerX} />)
            else return (<Player status={0} type="" player=""/>);
        }
        // is audience
        else
        {
            if(gameInfo.playerO)
                return (<Player status={0} type={`${gameInfo.playerO.username} (O)`} player={gameInfo.playerO} />)
            else
                return (<Player status={0} type="" player=""/>);
        }
    }

    let status;
    if (winner) {
        status = renderWinner(winner.square);
    } else if (!current.squares.includes(null)) {
        status = "Draw!";
    } else {
        status = renderTurn();
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
                        <Typography variant="h4">{`Room: ${gameInfo.id}`}</Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center" item xs={1}>
                        <Typography variant="h6">00:45</Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center" item xs={1}>
                        <Button variant="contained" color="primary" disableElevation>Invite...</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row"  style={{padding: 5}}>
                    <Grid container direction="column" item xs={2}>
                        <Grid container item justify="center" alignItems="center" spacing={2}>
                            {renderPlayer1()}
                            <Grid container item xs={12} justify="center" alignItems="center">
                                <Typography variant="h3">VS.</Typography>
                            </Grid>
                            {renderPlayer2()}
                            <Grid container item xs={12} justify="center" alignItems="center">
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary"
                                            disableElevation fullWidth>Give up</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary"
                                            disableElevation fullWidth>Draw deal</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={5} justify="center" alignItems="center">
                        {gameInfo.isStart ?
                            <Board
                                winningSquares={winner ? winner.line : []}
                                squares={current.squares}
                                onClick={i => handleClick(i)}
                                size={size}
                            />
                            : playerType === "X" ?
                            <Button onClick={startGame}>Play</Button>
                                : <Typography>Waiting for host start the game!</Typography>
                        }

                    </Grid>
                    <Grid item xs={5}>
                        <Grid container>
                            <Grid container item xs={12} justify="center">
                                <Typography variant={"h4"}>{status}</Typography>
                            </Grid>
                            <Grid container>
                                <Grid container direction={"column"} item xs={6}>
                                    <Grid item container justify="space-between">
                                        <Typography variant={"h5"}>Move history</Typography>
                                        <Switch onClick={() => sortHistory()}
                                                inputProps={{ 'aria-label': 'primary checkbox' }} />
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

