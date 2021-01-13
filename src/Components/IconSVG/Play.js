import * as React from "react"

function Play(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      {...props}
    >
      <g xmlns="http://www.w3.org/2000/svg">
        <circle
          cx={256}
          cy={256}
          fill="#fdbf00"
          r={256}
          data-original="#ff6b6b"
        />
        <path
          d="M512 256H0c0 141.385 114.615 256 256 256s256-114.615 256-256z"
          fill="#ff9f00"
          data-original="#ff1f3d"
        />
        <path
          d="M185.999 401A14.998 14.998 0 01171 386V126a15 15 0 0123.782-12.16l180 130a15 15 0 010 24.32l-180 130a14.988 14.988 0 01-8.783 2.84z"
          fill="#f9f9f9"
          data-original="#f9f9f9"
        />
        <path
          d="M171 256v130a15 15 0 0023.782 12.16l180-130A15.003 15.003 0 00381 256z"
          fill="#e2dff4"
          data-original="#e2dff4"
        />
      </g>
    </svg>
  )
}

export default Play
