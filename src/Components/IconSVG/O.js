import * as React from "react"

function O(props) {
    return (
        <svg
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx={15.5}
                cy={15.5}
                r={11.5}
                stroke="url(#prefix__paint1_linear)"
                strokeWidth={8}
            />
            <defs>
                <linearGradient
                    id="prefix__paint1_linear"
                    x1={-12}
                    y1={-13}
                    x2={31}
                    y2={31}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#02AAB0" />
                    <stop offset={1} stopColor="#00CDAC" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default O
