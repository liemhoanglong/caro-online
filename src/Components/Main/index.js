import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import io from 'socket.io-client';

//api local
// import ListUser from "../ListUser";
// import userAPI from '../../Util/userAPI';
//
// const socket = io.connect('localhost:3000');
//
 export default function HomeScreen() {
//     const [reset, setReset] = useState(true);
//     //danh sách user có trong database
//     const [listUser, setListUser] = useState([]);
//     //danh sách user dang online
//     const [listUserNow, setListUserNow] = useState([]);
//
//     // console.log(JSON.parse(localStorage.getItem("user")).id)
//     // socket nói
//     useEffect(() => {
//         const renderListUser = async () => {
//             try {
//                 let res = await userAPI.getAllUser();
//                 //xóa người dùng hiện thời ra khỏi list user
//                 const idUser = JSON.parse(localStorage.getItem("user")).id
//                 res = res.filter(item => item.id !== idUser)
//                 setListUser(res);
//                 // console.log(res);
//                 socket.emit('client-send-data', idUser)
//             } catch (error) {
//                 console.log('Failed to fetch: ', error);
//             }
//         }
//         renderListUser();
//     }, [])
//
//     useEffect(() => {
//         socket.on('server-send-data', (listUsersOnline) => {
//             setListUserNow(listUsersOnline);
//         })
//         socket.on('disconnect', (listUsersOnline) => {
//             setListUserNow(listUsersOnline);
//         })
//     })

    return (
        <React.Fragment>
            {/*<button onClick={() => { setReset(!reset) }}>Home</button>*/}
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
            <Link to="/testing" style={{ textDecoration: 'none', color: "inherit" }}>
                <Button>Testing</Button>
            </Link>
            {/*<ListUser listUser={listUser} listUserNow={listUserNow}/>*/}
        </React.Fragment>
    )
}