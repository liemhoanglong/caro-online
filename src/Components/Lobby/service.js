import callAPI from "../../Util/callAPI";

export async function getListRoom()
{
    return callAPI("GET", 'game/getListRoom',null);
}

export async function checkPasswordRoom ({id, password})
{
    return callAPI("POST", "game/checkPassword", {id, password})
}