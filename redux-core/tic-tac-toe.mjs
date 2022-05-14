import readline from "readline"
import {legacy_createStore as createStore} from "redux"

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

// This is the initial state of the program. We are using Redux as our state manager/framework. Study the fields here
// and build your understanding of the state. When you have a complete mental model of the state, then you have a solid
// foundation to understand the flow of the program.
const starterState = {
    // Who is the active team. Rather, "Who's turn is it right now? Team 'X' or team 'Y'?"
    team: 'X',

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

    teamOPositions: 0b000000000,

    legalMoves: globalThis.structuredClone(pointsMap)
}

/**
 * This is the Redux "reducer". I'm not really sure what to name it because it has multiple responsibilities. I can't
 * name it after all of these responsibilities. I'll stick with a generic name like "reducer".
 */
function reduce(state = starterState, action) {
    console.log("Hello from the reducer!")
    if (action.type !== "move") {
        // This is a bit awkward in my opinion. The Redux user (the programmer) will encounter an "INIT" event from the
        // Redux framework. That's fine. But I would like to "knowingly ignore" it by name (or Symbol) so that my program
        // can throw an error on "unknown unknowns". Handling unknown unknowns is a useful practice when building robust
        // code, especially in a dynamically typed language like JS where it's easy to have typos. Unfortunately, Redux
        // has purposely designed the "INIT" event to not be recognizable. See the discussion in StackOverflow and follow
        // the links from there: https://stackoverflow.com/questions/41305492/what-is-the-purpose-of-the-init-action-in-react-redux
        //
        // Specifically, I would like to import something like 'ActionTypes.INIT' from Redux and key off of it, and "knowingly
        // ignore" it, so that I can have a true "catch all" where I can throw an error on unrecognized types. I'm sure
        // to mistakenly dispatch a new action type during development and fail to handle it. I want to know about. I don't
        // want to design my code with silent failures. The switch pattern advertised on the Redux "Getting Started" page
        // shows a switch pattern which may yield silent failures: "https://redux.js.org/introduction/getting-started"
        //
        // It looks like this:
        //
        //     function counterReducer(state = { value: 0 }, action) {
        //       switch (action.type) {
        //         case 'counter/incremented':
        //           return { value: state.value + 1 }
        //         case 'counter/decremented':
        //           return { value: state.value - 1 }
        //         default:
        //           return state
        //       }
        //     }
        //
        // A valid counterpoint to my complaint is discussed here: https://stackoverflow.com/questions/55877893/why-return-default-case-instead-of-throw-in-reduxs-reducer
        // And I reckon that yes, if I grow the program then I would have a reason to use the "default do nothing" case
        // in my reducers.
        //
        // This is the code I would like to write, but I can't, because it will trigger when the "INIT" action is dispatched:
        // throw new Error(`Unrecognized action type '${action.type}'`)

        return state
    }

    const {move} = action

    state = globalThis.structuredClone(state)

    delete state.legalMoves[move]
    const point = pointsMap[move]

    if (state.team === 'X') {
        state.teamXPositions = state.teamXPositions | point
        state.team = 'O'
    } else {
        state.teamOPositions = state.teamOPositions | point
        state.team = 'X'
    }

    return state
}

const store = createStore(reduce)

const rl = readline.createInterface({
    input: process.stdin, output: process.stdout
})

/**
 * Check the team's positions ('X's or 'O's on the board) for a win condition.
 * Did the get three in a row horizontally, vertically or diagonally?
 */
function checkWin(positions, team) {
    if (positions === (positions | 0b111000000) ||

        positions === (positions | 0b000111000) ||

        positions === (positions | 0b000000111) ||

        positions === (positions | 0b100100100) ||

        positions === (positions | 0b010010010) ||

        positions === (positions | 0b001001001) ||

        positions === (positions | 0b100010001) ||

        positions === (positions | 0b001010100)) {

        console.log(`Team '${team}' wins! 🎉`)
        rl.close()
    }
}

function nextMovePrompt() {
    const team = store.getState().team
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

    if (store.getState().legalMoves[move] === undefined) {
        console.log(`The move '${move}' has already been made. Try another one.`)
        nextMovePrompt()
        return
    }

    store.dispatch({type: "move", move})
}

store.subscribe(function handlePostMove() {

    const state = store.getState()

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

    checkWin(state.teamXPositions, 'X')
    checkWin(state.teamOPositions, 'O')

    if ((state.teamXPositions | state.teamOPositions) === 0b111111111) {
        console.log("It's a draw!")
        rl.close()
    }

    nextMovePrompt()
})

nextMovePrompt()

rl.on('close', function () {
    console.log('\nThat was fun!')
    process.exit(0)
})
