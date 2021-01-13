import callAPI from "./callAPI";

const userAPI = {
    profile: async() =>{
        return callAPI("GET", "users/profile",null)
    },
    getAll: async () =>{
        return callAPI("GET", 'users/getAll', null);
    },

    editProfile: async(data) =>{
        return callAPI("POST", `users/edit-profile`, data);
    },

    changePass: async(data) =>{
        return callAPI("POST", `users/change-password`, data);
    },
}

export default userAPI;
