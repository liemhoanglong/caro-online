export default function calculateElo(scoreX, scoreO, result)
{
    const different = Math.abs(scoreX - scoreO)

    if(result === "Draw")
        return ({playerX: scoreX, playerO: scoreO})

    let scoreGet = {};
    if(different <= 50)
    {
        scoreGet.plus = Math.floor((15 + different) /8);
        scoreGet.minus = Math.floor((15 + different) /10);
    }
    else if(different <= 200)
    {
        scoreGet.plus = Math.floor((30 + different) /8);
        scoreGet.minus = Math.floor((30 + different) /10);
    }
    else if (different <= 500)
    {
        scoreGet.plus = Math.floor((65 + different) /8);
        scoreGet.minus = Math.floor((65 + different) /10);
    }
    else
    {
        scoreGet.plus = Math.floor((90 + different) /8);
        scoreGet.minus = Math.floor((90 + different) /10);
    }

    if(result === "X")
        return({playerX: scoreX + scoreGet.plus, playerO: scoreO - scoreGet.minus > 0 ? scoreO - scoreGet.minus : 0, diff: scoreGet})
    else return({playerX: scoreX - scoreGet.minus > 0 ? scoreX - scoreGet.minus : 0, playerO: scoreO + scoreGet.plus, diff: scoreGet})
}