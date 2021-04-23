import React from 'react'
import Square from './square'

const Board = ({ winningSquares, squares, onClick, size }) => {
    const renderSquare = (i, winningSquares, squares, onClick, size) => {
        return (
            <Square
                isWin={winningSquares.includes(i)}
                key={"square " + i}
                value={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    }
    const row = []
    let index = 0
    for (let i = 0; i < size; i++) {
        const sq = []
        for (let j = 0; j < size; j++) {
            sq.push(renderSquare(index, winningSquares, squares, onClick, size));
            index++
        }
        row.push(
            <div key={"row " + row + 1} className="board-row">
                {sq}
            </div>
        )
    }
    return <div>{row}</div>
}

export default Board