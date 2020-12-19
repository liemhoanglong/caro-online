import callAPI from "../../Util/callAPI";

export default async function getUserOnline()
{
    return callAPI("GET", 'users/getUserOnline',null);
}