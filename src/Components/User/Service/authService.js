import callAPI from "../../../Util/callAPI";
import {socket} from "../../../Context/socket";

export async function loginService(username, password){
    try
    {
        const res = await callAPI("POST", "auth/login", {
            username: username,
            password: password
        })
        if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
    }catch (e) {
        console.log(e);
        return {err: "Error"};
    }

}

export const signUpService = (username, firstName, lastName, password, email) =>
{
    return callAPI("POST", "auth/register", {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
    })
};

export const activateService = (id) =>
{
    return callAPI("GET", `users/activate/${id}`, null)
};

export const forgotPasswordService = (input) =>
{
    return callAPI("POST", `auth/forgot-password`, input)
};

export const resetPasswordService = (id, input) =>
{
    return callAPI("POST", `users/reset-password/${id}`, input)
};

export const logoutService = () => {
    socket.emit('user-log-out');
    localStorage.removeItem("user");
};

export const getCurrentUser = () =>
{
    return JSON.parse(localStorage.getItem('user'));
};