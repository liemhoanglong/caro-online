import React, { useState } from 'react';
import { Grid, GridList, Card, CardActions, CardActionArea, Button, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './game.css';
import Board from './board'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});


const config = 15

const Game = (props) => {
    const classes = useStyles();

    const [size, setSize] = useState(config);
    const [history, setHistory] = useState([{ squares: Array(size * size).fill(null), }])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)
    const [isDes, setIsDes] = useState(true)

    const handleClick = (i) => {
        const history2 = history.slice(0, stepNumber + 1);
        const current = history2[history2.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner1(squares, current.location) || squares[i]) {
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

    const jumpTo = (step) => {
        setStepNumber(step)
        setXIsNext((step % 2 === 0))
    }

    const loca = (move) => {
        let r = Math.floor((move) / size) + 1
        let c = Math.floor((move) % size) + 1
        return ': row ' + r + ' col ' + c
    }

    const current = history[stepNumber];
    const winner = calculateWinner1(current.squares, current.location);
    const moves = history.map((step, move) => {
        // console.log(history[move].location)
        const desc = move ?
            'Go to move #' + move + loca(history[move].location) :
            'Go to game start';
        return (
            <li key={move}>
                {/* <button onClick={() => jumpTo(move)}> */}
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

                {/* <form className="input-size">
                    <label htmlFor="size">Board size: </label>
                    <input type="number" id="size" name="size" onChange={(event) => setSize(event.target.value)} />
                </form> */}
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
                        Sort by: {isDes ? "Asending" : "Descending"}
                    </div>
                    <label className="switch">
                        <input type="checkbox" onClick={() => sortHistory()} />
                        <span className="slider round"></span>
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

// ========================================

const location = (move, size) => {
    let r = Math.floor((move) / size) + 1
    let c = Math.floor((move) % size) + 1
    return [r, c]
}

//Declaring a Winner
function calculateWinner(squares, size) {
    // console.log(squares)

    if (size <= 3) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { player: squares[a], line: [a, b, c] };
            }
        }
    } else {

    }

    return null;
}

function calculateWinner1(squares, indexNow) {
    const size = config;
    const di = [0, 0, 1, -1, -1, 1, -1, 1];
    const dj = [1, -1, 0, 0, -1, 1, 1, -1];

    let i = Math.floor(indexNow / size);
    let j = indexNow % size;

    for (let k = 0; k < di.length; k += 2) {
        let log = [];
        console.log(log)
        let tempI = i, tempJ = j;
        let tempIndex = tempI * size + tempJ;
        let count1 = 0;
        while (tempI >= 0 && tempI <= size - 1 && tempJ >= 0 && tempJ <= size - 1 && squares[tempIndex] === squares[indexNow]) {
            log.push(tempIndex);
            count1++;
            tempI = tempI + di[k];
            tempJ = tempJ + dj[k];
            tempIndex = tempI * size + tempJ;
        }
        tempI = i;
        tempJ = j;
        tempIndex = tempI * size + tempJ;
        let count2 = 0;
        while (tempI >= 0 && tempI <= size - 1 && tempJ >= 0 && tempJ <= size - 1 && squares[tempIndex] === squares[indexNow]) {
            log.push(tempIndex);
            count2++;
            tempI = tempI + di[k + 1];
            tempJ = tempJ + dj[k + 1];
            tempIndex = tempI * size + tempJ;
        }
        if (count1 + count2 - 1 === 5) {
            const winner = {
                square: squares[indexNow],
                line: log
            }
            return winner;
        }
    }
    return null;
}

export default Game;
