import callAPI from "./callAPI";

const gameAPI = {
    getAll: async () =>{
        return callAPI("GET", 'game/get-all-my-room', null);
    },
    
    getOne: async(id) =>{
        return callAPI("GET", `game/get-room?id=${id}`, null);
    },
}

export default gameAPI;
