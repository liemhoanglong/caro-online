import callAPI from "../../../Util/callAPI";

export async function loginService(username, password){
    try
    {
        const res = await callAPI("POST", "auth/login", {
            username: username,
            password: password
        })
        if (res.data.accessToken) {
            // console.log(res.data)
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

export const logoutService = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () =>
{
    return JSON.parse(localStorage.getItem('user'));
};