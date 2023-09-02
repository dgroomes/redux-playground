import './ConnectFourBoard.css'
import ConnectFourColumn from "./ConnectFourColumn";

/**
 * This is the Connect Four "game board": the vertically standing plastic structure.
 */
export default function ConnectFourBoard() {

    // Create the columns of visual elements that make up the Connect Four game board grid.
    //
    // How do we write an expression that creates an array of some length? It's surprisingly obscure. See the
    // discussion in this StackOverflow question titled "functional way to iterate over range (ES6/7)"
    // https://stackoverflow.com/questions/30650961/functional-way-to-iterate-over-range-es6-7
    const connectFourColumns = [1, 2, 3, 4, 5, 6, 7].map(columnIndex => {
        return <ConnectFourColumn key={columnIndex} columnIndex={columnIndex}/>
    })

    return <div className="ConnectFourBoard">{connectFourColumns}</div>
}
