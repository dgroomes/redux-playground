import readline from "readline"

console.log(`Let's play Tic-Tac-Toe!

Player 1 goes first. Try to connect three Xs in a row!


          Left    Middle    Right
Top             |        | 
        --------|--------|--------  
Middle          |        | 
        --------|--------|--------  
Bottom          |        | 

Where do you want to place an 'X'?
Type your selection in two letters. The options are:

* 'TL' for the top row and left column  
* 'TM' for the top row and middle middle  
* 'TR' for the top row and right column
* 'ML' for the middle row and left column  
* 'MM' for the middle row and middle middle  
* 'MR' for the middle row and right column
* 'BL' for the bottom row and left column  
* 'BM' for the bottom row and middle middle  
* 'BR' for the bottom row and right column
`)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`> `, function acceptMove(move) {
    console.log(`Your move was '${move}'`)
});

rl.on('close', function () {
    console.log('\nThat was fun!');
    process.exit(0);
});
