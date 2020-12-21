import React, {useState} from 'react';
import {Button, Card, CardActionArea, CardActions, CardMedia, Grid, GridList} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import calculateWinner from "./gameCheck";

import './game.css';
import Board from './board'
<<<<<<< Updated upstream
=======
import Player from "./player";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import {socket, handleMove} from "../../Context/socket";

export default function Game() {
    const [size, setSize] = useState(10);
    const [history, setHistory] = useState([{squares: Array(size * size).fill(null),}])
    const [stepNumber, setStepNumber] = useState(0)

    const [isPlayerX, setIsPlayerX] = useState(true);
    const [isYourTurn, setIsYourTurn] = useState(true)
    const [isDes, setIsDes] = useState(true)
>>>>>>> Stashed changes

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

<<<<<<< Updated upstream
const config = 15
=======
    useEffect(() => {
        socket.on("join-room-success", (data) => {
            if(data.playerO === user.id)
            {
                setIsYourTurn(false);
            }
        })
>>>>>>> Stashed changes

export default function Game(){
    const classes = useStyles();

<<<<<<< Updated upstream
    const [size, setSize] = useState(config);
    const [history, setHistory] = useState([{ squares: Array(size * size).fill(null), }])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)
    const [isDes, setIsDes] = useState(true)

    const handleClick = (i) => {
        const history2 = history.slice(0, stepNumber + 1);
        const current = history2[history2.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares, current.location) || squares[i]) {
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
=======
    useEffect(() => {
        socket.on("move", (data) => {
            setHistory(data.history);
            setStepNumber(data.step);
            setIsPlayerX(!isPlayerX);
            setIsYourTurn(!isYourTurn);
        })
    })

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
>>>>>>> Stashed changes
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
    const winner = calculateWinner(current.squares, current.location);
    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move + location(history[move].location) :
            'Go to game start';
        return (
            <li key={move}>
                <button style={{ width: "110%" }}>
                    {move === stepNumber ? <b>{desc}</b> : desc}
                </button>
            </li>
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
        <div className="game">
            <Grid item xs={3}>
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardActionArea style={{ textAlign: "center" }}>
                            <h1>Bạn</h1>
                            <CardMedia
                                component="img"
                                alt="player 1"
                                height="200"
                                src="https://gamek.mediacdn.vn/133514250583805952/2020/3/7/anh-1-1583592253266481895600.jpg"
                                title="player 1"
                            />
                            <h2>Naruto</h2>
                        </CardActionArea>
                    </Card>
                </Grid>
                <br />
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardActionArea style={{ textAlign: "center" }}>
                            <h1>Đối thủ</h1>
                            <CardMedia
                                component="img"
                                alt="player 2"
                                height="200"
                                src="https://tophinhanhdep.com/wp-content/uploads/2020/03/hinh-nen-bell-mere-hai-tac-mu-rom-em-gai-nuoi-1024x576.jpg"
                                title="player 2"
                            />
                            <h2>Nami</h2>
                        </CardActionArea>
                        <CardActions style={{ textAlign: "center" }}>
                            <Button variant="contained" color="secondary">
                                Xin hòa
                                </Button>
                            <Button variant="contained" color="primary">
                                Đầu hàng
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <div className="game-board">
                    <Board
                        winningSquares={winner ? winner.line : []}
                        squares={current.squares}
                        onClick={i => handleClick(i)}
                        size={size}
                    />
                </div>
            </Grid>
            <Grid item xs={3}>
                <Grid item xs={12} className="game-info">
                    <h1>Lịch sử bước đi</h1>
                    <div className="game-status">{status}</div>
                    <div>
                        Sort by: {isDes ? "Ascending" : "Descending"}
                    </div>
                    <label className="switch">
                        <input type="checkbox" onClick={() => sortHistory()} />
                    </label>
                    <GridList cellHeight={160}>
                        <ol>{isDes ? moves.reverse() : moves}</ol>
                    </GridList>
                </Grid>
                <Grid item xs={12}>
                    <GridList cellHeight={160}>
                        <h3>hello</h3>
                    </GridList>
                </Grid>
            </Grid>
        </div>
    );
}

