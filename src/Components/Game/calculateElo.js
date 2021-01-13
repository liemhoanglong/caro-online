export default function calculateElo(scoreX, scoreO, result)
{
    const different = Math.abs(scoreX - scoreO)

    if(result === "Draw")
        return ({playerX: scoreX, playerO: scoreO})

    let scoreGet;
    if(different <= 50)
        scoreGet = 14;
    else if(different <= 200)
        scoreGet = 31;
    else if (different <= 500)
        scoreGet = 64;
    else scoreGet = 112;

    if(result === "X")
        return({playerX: scoreX + scoreGet, playerO: scoreO - scoreGet > 0 ? scoreO - scoreGet : 0, diff: scoreGet})
    else return({playerX: scoreX - scoreGet > 0 ? scoreX - scoreGet : 0, playerO: scoreO + scoreGet, diff: scoreGet})
}