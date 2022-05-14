import readline from "readline"

console.log(`Let's play Tic-Tac-Toe!

Team 'X' goes first. Try to connect three Xs in a row!


          Left    Middle    Right
Top             |        | 
        --------|--------|--------  
Middle          |        | 
        --------|--------|--------  
Bottom          |        | 

Where do you want to place an 'X'?
Type your selection in two letters. The options are:

* 'tl' for the top row and left column  
* 'tm' for the top row and middle column  
* 'tr' for the top row and right column
* 'ml' for the middle row and left column  
* 'mm' for the middle row and middle column  
* 'mr' for the middle row and right column
* 'bl' for the bottom row and left column  
* 'bm' for the bottom row and middle column  
* 'br' for the bottom row and right column
`)

const state = {
    // Who is the active team. Rather, "Who's turn is it right now? Team 'X' or team 'Y'?"
    team: 1,

    // The board state is represented in two bitmaps. (Admittedly, this is kind of a strange implementation for tic-tac-toe,
    // but I want to learn about bitwise operators, bit shifting and thinking about bits. A playground-style repo is the
    // perfect place to learn and experiment).
    //
    // Each bit in the 'teamXPositions' bitmap models the state of the 'X' check at a point on the tic-tac-toe board.
    // If the bit is 1, then there is an 'X' there. The order of the bit places correspond to the order of the board
    // boxes, row by row, starting with the top row and leftmost box. In other words, there are nine bit places and
    // there are nine boxes on the board.
    //
    // The 'teamOPositions' bitmap follows the same idea, but for 'O' checks.
    //
    // Learn about bitmaps here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR
    teamXPositions: 0b000000000,
    teamOPositions: 0b000000000
}

const pointsMap = {
    tl: 0b100000000,
    tm: 0b010000000,
    tr: 0b001000000,
    ml: 0b000100000,
    mm: 0b000010000,
    mr: 0b000001000,
    bl: 0b000000100,
    bm: 0b000000010,
    br: 0b000000001,
}

const legalMoves = globalThis.structuredClone(pointsMap)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * Check the team's positions ('X's or 'O's on the board) for a win condition.
 * Did the get three in a row horizontally, vertically or diagonally?
 *
 * @param positions the current team's board positions (as a bitmap)
 */
function checkWin(positions) {
    if (
        positions === (positions | 0b111000000) ||
        positions === (positions | 0b000111000) ||
        positions === (positions | 0b000000111) ||
        positions === (positions | 0b100100100) ||
        positions === (positions | 0b010010010) ||
        positions === (positions | 0b001001001) ||
        positions === (positions | 0b100010001) ||
        positions === (positions | 0b001010100)) {
        const team = state.team === 1 ? 'X' : 'O'
        console.log(`Team '${team}' wins! 🎉`)
        rl.close()
    }
}

function nextMovePrompt() {
    const team = state.team === 1 ? 'X' : 'O'
    rl.question(`Place an '${team}' > `, acceptMove)
}

function acceptMove(move) {
    move = move.toLowerCase()
    const point = pointsMap[move]

    if (point === undefined) {
        console.log(`The move '${move}' is not recognized. Try another one.`)
        nextMovePrompt()
        return
    }

    if (legalMoves[move] === undefined) {
        console.log(`The move '${move}' has already been made. Try another one.`)
        nextMovePrompt()
        return
    }

    delete legalMoves[move]

    let nextTeam
    if (state.team === 1) {
        state.teamXPositions = state.teamXPositions | point
        nextTeam = 2
    } else {
        state.teamOPositions = state.teamOPositions | point
        nextTeam = 1
    }

    // TODO check for a draw

    /**
     * Render a row string.
     *
     * E.g. 'x - o', 'x x o', '- - -'
     */
    function renderRow(xPositions, oPositions) {
        // Remember your JS order of operations: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
        let left = (xPositions & 0b100) ? 'X' : (oPositions & 0b100) ? 'O' : '-'
        let middle = (xPositions & 0b010) ? 'X' : (oPositions & 0b010) ? 'O' : '-'
        let right = (xPositions & 0b001) ? 'X' : (oPositions & 0b001) ? 'O' : '-'
        return [left, middle, right].join(' ')
    }

    let boardRender = `
   ${renderRow(state.teamXPositions >> 6, state.teamOPositions >> 6)}    
   ${renderRow(state.teamXPositions >> 3, state.teamOPositions >> 3)}    
   ${renderRow(state.teamXPositions, state.teamOPositions)}    
`

    console.log(boardRender)

    checkWin(state.teamXPositions)
    checkWin(state.teamOPositions)

    state.team = nextTeam

    nextMovePrompt()
}

nextMovePrompt()

rl.on('close', function () {
    console.log('\nThat was fun!')
    process.exit(0)
})
