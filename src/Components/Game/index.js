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

const size = 20;

export default function Game() {
    // const [size, setSize] = useState(10);
    const [history, setHistory] = useState([{squares: Array(size * size).fill(null)}])
    const [stepNumber, setStepNumber] = useState(0)

    const [displayRenderX, setDisplayRenderX] = useState(true);
    const [isYourTurn, setIsYourTurn] = useState(true);

    const [gameInfo, setGameInfo] = useState({});
    const [playerType, setPlayerType] = useState("");

   // const [isGameOver, setIsGameOver] = useState(false); // game end by win, lose or draw
    // game end by player out room
    const [isPlayerOut, setIsPlayerOut] = useState(false);

    const [isDes, setIsDes] = useState(true)

    useEffect(() => {
        const joinRoomPlayer = (data) => {
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
        if(gameInfo.playerX && gameInfo.playerO)
        {
            setGameInfo({...gameInfo, isStart: true});
            socket.emit("play-game", gameInfo.id);
        }
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
                <ListItemText primary={desc}/>
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
        else// is audience
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
        <Grid container direction="column">
            <Grid container alignContent="center" justify="space-between" style={{padding: 10}}>
                <Grid item>
                    <Typography variant="h5">{`Room: ${gameInfo.id}`}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"h5"}>{status}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" disableElevation>Invite friend</Button>
                </Grid>
            </Grid>
            <Grid container direction="row"  style={{padding: 5}}>
                <Grid container direction="column" item xs={2}>
                    <Grid container item justify="center" alignItems="center" spacing={2}>
                        {renderPlayer1()}
                        <Grid container item xs={12} justify="center" alignItems="center">
                            {/*<Typography variant="h3">VS.</Typography>*/}
                            <svg style={{margin:'0px 10px'}} id="Layer_1"
                                 enableBackground="new 0 0 512 512"
                                 height="30" viewBox="0 0 512 512" width="30"
                                 xmlns="http://www.w3.org/2000/svg"><path d="m497 60.445h.01z"/><g><path d="m497 0h-45.445c-3.979 0-7.794 1.58-10.606 4.394l-290.896 290.895 66.658 66.658 290.895-290.896c2.814-2.813 4.394-6.628 4.394-10.607v-45.444c0-8.284-6.716-15-15-15z"/><path d="m59.792 385.693c-8.902 8.902-13.637 20.537-14.081 32.272-11.592.324-23.087 4.897-31.935 13.744-18.367 18.367-18.367 48.147 0 66.515 18.367 18.367 48.147 18.367 66.515 0 8.794-8.794 13.366-20.205 13.739-31.726 11.523-.372 22.935-4.948 31.73-13.743l27.24-27.241-66.515-66.514z"/><path d="m272.446 306.798h94.268v25.564h-94.268z" transform="matrix(.707 -.707 .707 .707 -132.374 319.58)"/><path d="m168.129 234.786 66.658-66.658-163.735-163.734c-2.813-2.814-6.628-4.394-10.607-4.394h-45.445c-8.284 0-15 6.716-15 15v45.444c0 3.979 1.58 7.794 4.394 10.606z"/><path d="m466.29 417.966c-.444-11.735-5.18-23.371-14.081-32.272l-26.694-26.694-66.515 66.514 27.241 27.241c8.795 8.795 20.207 13.371 31.73 13.743.373 11.521 4.945 22.932 13.739 31.726 18.367 18.367 48.147 18.367 66.515 0 18.367-18.367 18.367-48.147 0-66.515-8.848-8.846-20.343-13.419-31.935-13.743z"/><path d="m443.349 277.527c-5.858-5.858-15.356-5.857-21.213 0l-144.609 144.608c-5.858 5.857-5.858 15.356 0 21.213 5.857 5.857 15.355 5.857 21.213 0l144.609-144.608c5.858-5.857 5.858-15.355 0-21.213z"/><path d="m89.864 277.527c-5.857-5.857-15.355-5.858-21.213 0s-5.858 15.355 0 21.213l144.609 144.608c5.857 5.857 15.356 5.857 21.213 0 5.858-5.857 5.858-15.355 0-21.213z"/></g></svg>
                        </Grid>
                        {renderPlayer2()}
                        <Grid container item xs={12} justify="space-around" alignItems="baseline">
                            <Grid item>
                                <Button variant="contained" color="primary">Give up</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary">Draw deal</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={6} justify="center" alignContent="center">
                    <Grid item>
                    {gameInfo.isStart ?
                        <Board
                            winningSquares={winner ? winner.line : []}
                            squares={current.squares}
                            onClick={i => handleClick(i)}
                            size={size}
                        />
                        : playerType === "X" ?
                        <Button variant="contained" onClick={startGame}>Play</Button>
                            : <Typography>Waiting for host start the game!</Typography>
                    }
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid container item spacing={1}>
                            <Grid item xs={12} zeroMinWidth wrap="nowrap">
                                <Typography variant={"h5"}>Chat</Typography>
                                <ChatRoom/>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item container justify="space-between" xs={12}>
                                    <Typography variant="h5">Move history</Typography>
                                    <Switch onClick={() => sortHistory()}
                                            inputProps={{ 'aria-label': 'primary checkbox' }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper elevation={2}>
                                        <List component="nav" dense
                                              style={{height: 200, maxHeight: 300, overflow: "auto"}}>
                                            {isDes ? moves.reverse() : moves}
                                        </List>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

