import callAPI from "../../../Util/callAPI";

export const GoogleLoginService = async (token) =>
{
    try
    {
        const res = await callAPI("POST", "auth/loginWithGoogle", {
            token: token
        });

        if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
    }catch(e)
    {
        console.log(e);
        return {err: "Error"};
    }
}

export const FacebookLoginService = async (token, userID) =>
{
    try
    {
        const res = await callAPI("POST", "auth/loginWithFacebook", {
            token: token,
            userID: userID,
        });

        if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
    }catch(e)
    {
        console.log(e);
        return {err: "Error"};
    }
}

