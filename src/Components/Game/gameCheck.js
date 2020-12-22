
export default  function calculateWinner(squares, indexNow, size) {
    const di = [0, 0, 1, -1, -1, 1, -1, 1];
    const dj = [1, -1, 0, 0, -1, 1, 1, -1];

    let i = Math.floor(indexNow / size);
    let j = indexNow % size;

    for (let k = 0; k < di.length; k += 2) {
        let log = [];
        let tempI = i, tempJ = j;
        let tempIndex = tempI * size + tempJ;
        let count1 = 0;
        while (tempI >= 0 && tempI <= size - 1 && tempJ >= 0 && tempJ <= size - 1 && squares[tempIndex] === squares[indexNow]) {
            log.push(tempIndex);
            count1++;
            tempI = tempI + di[k];
            tempJ = tempJ + dj[k];
            tempIndex = tempI * size + tempJ;
        }
        tempI = i;
        tempJ = j;
        tempIndex = tempI * size + tempJ;
        let count2 = 0;
        while (tempI >= 0 && tempI <= size - 1 && tempJ >= 0 && tempJ <= size - 1 && squares[tempIndex] === squares[indexNow]) {
            log.push(tempIndex);
            count2++;
            tempI = tempI + di[k + 1];
            tempJ = tempJ + dj[k + 1];
            tempIndex = tempI * size + tempJ;
        }
        if (count1 + count2 - 1 === 5) {
            return {
                square: squares[indexNow],
                line: log
            };
        }
    }
    return null;
}