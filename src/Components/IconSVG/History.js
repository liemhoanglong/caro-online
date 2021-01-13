import * as React from "react"

function History(props) {
  return (
    <svg
      height={props.height}
      viewBox="0 0 64 64"
      width={props.width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.036 5a5 5 0 015 5v5h-5a5 5 0 010-10z" fill="#f68820" />
      <path
        d="M45.036 54v-7.5a2 2 0 00-2-2 2 2 0 002-2v-28a2 2 0 00-2-2 2 2 0 002-2V10a5 5 0 00-5-5h-32a5 5 0 015 5v10.5a2 2 0 002 2 2 2 0 00-2 2V54a5 5 0 005 5h32a5 5 0 01-5-5z"
        fill="#fbbe18"
      />
      <path
        d="M26.036 14.5h12a1 1 0 000-2h-12a1 1 0 000 2zM20.036 19.5h18a1 1 0 000-2h-18a1 1 0 000 2zM20.036 24.5h18a1 1 0 000-2h-18a1 1 0 000 2zM20.036 29.5h18a1 1 0 000-2h-18a1 1 0 000 2zM20.036 34.5h18a1 1 0 000-2h-18a1 1 0 000 2zM20.036 39.5h18a1 1 0 000-2h-18a1 1 0 000 2zM20.036 44.5h8.5a1 1 0 000-2h-8.5a1 1 0 000 2z"
        fill="#f68820"
      />
      <g>
        <path d="M18.036 49a2.5 2.5 0 100 5h7.5v-5z" fill="#bf6b1e" />
      </g>
      <g>
        <path d="M18.036 49a5 5 0 010 10h32a5 5 0 000-10z" fill="#f68820" />
      </g>
      <g>
        <path
          d="M35.036 39.5h5.929a5.004 5.004 0 003.536-1.464l15-15a5 5 0 000-7.071l-.929-.929a5 5 0 00-7.071 0l-15 15a4.998 4.998 0 00-1.464 3.536V39.5z"
          fill="#b3b4b6"
        />
        <path
          d="M35.036 39.5h5.929a5.004 5.004 0 003.536-1.464l15-15a5 5 0 000-7.071l-.465-.465z"
          fill="gray"
        />
        <path
          d="M48.036 26.5v-8l3.464-3.464a5 5 0 017.071 0l.929.929a5 5 0 010 7.071L56.036 26.5z"
          fill="#55525b"
        />
        <path
          d="M48.036 26.5l11-11 .464.464a5 5 0 010 7.071L56.036 26.5z"
          fill="#353744"
        />
        <path
          d="M31.036 44a.5.5 0 01-.354-.853l28-28a.5.5 0 01.707.707l-28 28a.498.498 0 01-.353.146z"
          fill="#dbdee3"
        />
      </g>
    </svg>
  )
}

export default History
