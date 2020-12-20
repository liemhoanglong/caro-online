import * as Config from "../Constant/config"
import io from "socket.io-client"

export const socket = io.connect(Config.API_URL);

export const userLogin = (userID, username) =>
{
    socket.emit("user-login", {userID,username});
}

