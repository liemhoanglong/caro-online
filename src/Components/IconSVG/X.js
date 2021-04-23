import * as React from "react"

function X(props) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.828 24.172a4 4 0 105.657 5.656l8.343-8.343 8.628 8.628a4 4 0 005.657-5.657l-8.628-8.628 8.628-8.627a4 4 0 10-5.657-5.657l-8.628 8.628-8.343-8.344a4 4 0 00-5.657 5.657l8.344 8.343-8.344 8.344z"
                fill="url(#prefix__paint0_linear)"
            />
            <defs>
                <linearGradient
                    id="prefix__paint0_linear"
                    x1={-13.343}
                    y1={-2.279}
                    x2={31.95}
                    y2={31.255}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#EB3349" />
                    <stop offset={1} stopColor="#F45C43" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default X
