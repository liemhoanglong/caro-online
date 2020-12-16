import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import io from 'socket.io-client';

//api local
import ListUser from "../ListUser";
import userAPI from '../../Util/userAPI';

const socket = io.connect('localhost:3000');

export default function HomeScreen() {
    const [reset, setReset] = useState(true);
    //danh sách user có trong database
    const [listUser, setListUser] = useState([]);
    //danh sách user dang online
    const [listUserNow, setListUserNow] = useState([]);

    // console.log(JSON.parse(localStorage.getItem("user")).id)
    // socket nói
    useEffect(() => {
        const renderListUser = async () => {
            try {
                let res = await userAPI.getAllUser();
                //xóa người dùng hiện thời ra khỏi list user
                const idUser = JSON.parse(localStorage.getItem("user")).id
                res = res.filter(item => item.id !== idUser)
                setListUser(res);
                // console.log(res);
                socket.emit('client-send-data', idUser)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        renderListUser();
    }, [])

    useEffect(() => {
        // socket nghe user login
        socket.on('server-send-data', (listUsersOnline) => {
            // console.log('connect '+JSON.stringify(listUsersOnline));
            setListUserNow(listUsersOnline);
            // console.log('connect '+JSON.stringify(listUserNow));
        })

        // socket nghe user logout
        socket.on('disconnect', (listUsersOnline) => {
            // console.log('disconnect '+ JSON.stringify(listUsersOnline));
            setListUserNow(listUsersOnline);
            // console.log('disconnect '+JSON.stringify(listUserNow));
        })
    })    
    
    // const [state, setState] = useState({ message: '', name: '' })
    // const [chat, setChat] = useState([])

    // useEffect(() => {
    //     socket.on('message', ({ name, message }) => {
    //         setChat([...chat, { name, message }])
    //     })
    // })

    // const onTextChange = e => {
    //     setState({ ...state, [e.target.name]: e.target.value })
    // }

    // const onMessageSubmit = e => {
    //     e.preventDefault()
    //     const { name, message } = state
    //     socket.emit('message', { name, message })
    //     setState({ message: '', name })
    // }

    // const renderChat = () => {
    //     return chat.map(({ name, message }, index) => (
    //         <div key={index}>
    //             <h3>
    //                 {name}: <span>{message}</span>
    //             </h3>
    //         </div>
    //     ))
    // }

    return (
        <React.Fragment>
            <button onClick={() => { setReset(!reset) }}>Home</button>
            <Link to="/login" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Login</Button>
            </Link>

            <Link to="/register" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Register</Button>
            </Link>
            <Link to="/lobby" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Lobby</Button>
            </Link>
            <Link to="/game" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Play Now</Button>
            </Link>
            <Link to="/test" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Testing</Button>
            </Link>
            <ListUser listUser={listUser} listUserNow={listUserNow}/>
            {/*<div className="card">*/}
            {/*    <form onSubmit={onMessageSubmit}>*/}
            {/*        <h1>Messanger</h1>*/}
            {/*        <div className="name-field">*/}
            {/*            <TextField*/}
            {/*                name="name"*/}
            {/*                onChange={e => onTextChange(e)}*/}
            {/*                value={state.name}*/}
            {/*                label="Name"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <TextField*/}
            {/*                name="message"*/}
            {/*                onChange={e => onTextChange(e)}*/}
            {/*                value={state.message}*/}
            {/*                id="outlined-multiline-static"*/}
            {/*                variant="outlined"*/}
            {/*                label="Message"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <button>Send Message</button>*/}
            {/*    </form>*/}
            {/*    <div className="render-chat">*/}
            {/*        <h1>Chat Log</h1>*/}
            {/*        {renderChat()}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </React.Fragment>
    )
}