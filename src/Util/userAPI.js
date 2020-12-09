import callAPI from "./callAPI";

const userAPI = {
    getAllUser: async () => {
        const url = `users/getAll`;
        const res = await callAPI("GET", url, null);
        return res.data;
    },
}

export default userAPI;

