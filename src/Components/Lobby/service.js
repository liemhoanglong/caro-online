import callAPI from "../../Util/callAPI";

export default async function getListRoom()
{
    return callAPI("GET", 'game/getListRoom',null);
}