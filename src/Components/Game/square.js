import React from 'react'

const Square = (props) => {
  return (
    <button 
      className={"square" + (props.isWin ? " square-win" : '') + (props.value === 'X' ? " X turn": '')}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square