//1.deposit some money    DONE
//2.determine no of lines to bet on   DONE
//3.collect a bet amt    DONE
//4.spin the slot machine    DONE
//5.check for win
//6.give their money
//7.play again

const prompt = require("prompt-sync")();

const ROWS =3;
const COLS =3;
const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8,
}
const SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}





const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter a deposit amount : ");
    const numberDepositAmount = parseFloat(depositAmount);
    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0)
    {
        console.log("invalid deposit AMOUNT, Try Again!")
    }
    else{
        return numberDepositAmount;
    }
}
};


const getNumberOFLines = () => {
    while(true){
    const lines = prompt("Enter the number of Lines[1-3] : ");
    const numberOfLines = parseFloat(lines);
    if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3)
    {
        console.log("inc=valid Entry.Please try Again..!");
    }else{
        return numberOfLines;
    }
};
};

const getBet = (balance,lines) => {
    while(true){
    const bet = prompt("Enter the bet Amt per Line : ");
    const numberBet = parseFloat(bet);
    if(isNaN(numberBet) || numberBet<= 0 || numberBet > balance/lines)
    {
        console.log("Invalid Bet... Try Again!");
    }
    else{
        return numberBet;
    }
}
};

const spin = () => {
    const symbols = [];
    for(const [symbol , count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0;i < count ; i++)
        {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0; i< COLS; i++)
    {
        reels.push([]);
        const selectedSymbols = [...symbols];
        for(let j = 0;j<ROWS;j++)
        {
            const randomIndex = Math.floor(Math.random()*selectedSymbols.length);
            const selectedSymbol = selectedSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            selectedSymbols.splice(randomIndex,1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for(let i = 0;i< ROWS;i++)
    {
        rows.push([]);
        for(let j=0;j<COLS;j++)
        {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString ="";
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length -1)
            {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = ( rows , bet , lines ) => {
    let winnings = 0;
    for(let row =0 ; row < lines ; row++)
    {
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols)
        {
            if(symbol != symbols[0])
            {
                allSame = false;
                break;
            };
        }
        if(allSame)
        {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }

    }
    return winnings;
}

let balance = deposit();
const numberOfLines = getNumberOFLines();
const bet = getBet(balance,numberOfLines);
const reels = spin();
console.log(reels);
const rows = transpose(reels);
console.log(rows);
printRows(rows);
const winnings = getWinnings(rows,bet,numberOfLines);
console.log(winnings);
console.log("You won $" + winnings.toString());