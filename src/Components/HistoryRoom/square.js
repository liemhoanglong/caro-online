import React from 'react'

import X from '../IconSVG/X';
import O from '../IconSVG/O';

const Square = (props) => {
  return (
    <button
      className={"square" + (props.isWin ? " square-win" : '')}
      onClick={props.onClick}
    >
      {props.value === 'X' ? <X /> : props.value === 'O' ? <O /> : ''}
    </button>
  );
}

export default Square