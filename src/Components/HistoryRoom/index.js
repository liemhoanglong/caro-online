import React, { useEffect, useState } from 'react';
import { Grid, GridList, Button, Switch, Box, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './game.css';
import Board from './board'
import Player from "./player";
import calculateWinner from "./gameCheck";
import War from '../IconSVG/War';
import gameAPI from '../../Util/gameAPI'
import userAPI from '../../Util/userAPI'

const size = 20;

export default function HistoryRoom(props) {
  // console.log(props.match)
  const [history, setHistory] = useState();
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isDes, setIsDes] = useState(true);
  const [data, setData] = useState();
  const [user, setUser] = useState();
  // console.log(data);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await gameAPI.getOne(props.match.params.id);
        setData(res.data);
        setHistory(res.data.history.history);
        setStepNumber(res.data.history.step);
      } catch (error) {
        console.log('Failed to fetch: ', error);
      }
    }
    fetchAll();
  }, [])

  console.log(user)
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await userAPI.getAll();
        setUser(res.data.filter(item => item.id === data.playerX.userID || item.id === data.playerO.userID));
      } catch (error) {
        console.log('Failed to fetch: ', error);
      }
    }
    fetchAll();
  }, [data])

  const handleClick = (i) => {
    // const history2 = history.slice(0, stepNumber + 1);
    // const current = history2[history2.length - 1]
    // const squares = current.squares.slice()
    // if (calculateWinner(squares, current.location, size) || squares[i]) {
    //   return;
    // }
    // squares[i] = xIsNext ? 'X' : 'O';
    // setHistory(history2.concat([{
    //   squares: squares,
    //   location: i
    // }]))
    // setStepNumber(history2.length)
    // setXIsNext(!xIsNext)
    // setIsDes(true)
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

  if (history) {
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares, current.location, size);
    const moves = history.map((step, move) => {
      // console.log(history[move].location)
      const desc = move ?
        'Go to move #' + move + loca(history[move].location) :
        'Go to game start';
      return (
        <Button variant="contained" key={move} onClick={() => jumpTo(move)} size="small" style={{ width: '95%', fontSize: 11, margin: 5 }}>
          {move === stepNumber ? <b>{desc}</b> : desc}
        </Button>
      );
    });

    const msg = data.chat.map((item, i) => {
      return (
        <Typography style={{width:"100%", height:"auto"}} variant="subtitle1">
          <div key={i} variant="body2" gutterBottom >
            <b>{item.username}: </b>{item.data}
          </div>
        </Typography>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner.square;
    } else if (!current.squares.includes(null)) {
      status = "Draw";
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
      <>
        {
          data ?
          <Container>
            <br/>
            <Grid container spacing={3} className="game">
              <Grid item xs={3}>
                <Grid item xs={12}>
                  <Player elo={user ? user[0].elo : 1500} username={data.playerX.username} type={"X"} />
                </Grid>
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <War width='100px' height='100px' />
                </div>
                <Grid item xs={12}>
                  <Player elo={user ? user[1].elo : 1400} username={data.playerO.username} type={"O"} />
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
                  <Container>
                    <h1 className="game-status">{status}</h1>
                    <h2>History move</h2>
                    <Box component="div" display="inline" p={1}>
                      <Switch onClick={() => sortHistory()} inputProps={{ 'aria-label': 'primary checkbox' }} />
                    </Box>
                    <Box component="div" display="inline" p={1}>
                      Sort by: {isDes ? "Asending" : "Descending"}
                    </Box>
                    <GridList cellHeight={160}>
                      <div style={{ width: '100%' }}>{isDes ? moves.reverse() : moves}</div>
                    </GridList>
                  </Container>
                </Grid>
                <Grid item xs={12} className="game-info">
                  <Container>
                    <h2>Chat</h2>
                    <GridList cellHeight={160}>
                      <div style={{ width: '100%' }}>
                        {msg}
                      </div>
                    </GridList>
                  </Container>
                </Grid>
              </Grid>
            </Grid>
          </Container>

            : null
        }
      </>

    )
  }
  else return <></>

}
