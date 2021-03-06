import axios from "axios"
const URL_API = "http://localhost:3000/";

const callAPI = async (method, pathUrl, body) => {
    const token = await JSON.parse(localStorage.getItem('user'));
    return axios({
        method: method,
        url: URL_API + pathUrl,
        data: body,
        headers: {"Authorization" : `Bearer ${token? token.accessToken: "null"}`}
    });

}

export default callAPI;