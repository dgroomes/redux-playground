import './ConnectFourStructure.css'
import ConnectFourColumn from "./ConnectFourColumn";

/**
 * This is the Connect Four structure: the vertically standing "game board".
 */
export default function ConnectFourStructure() {

    // Create the columns of visual elements that make up the Connect Four grid structure.
    //
    // How do we write an expression that creates an array of some length? It's surprisingly obscure. See the
    // discussion in this StackOverflow question titled "functional way to iterate over range (ES6/7)"
    // https://stackoverflow.com/questions/30650961/functional-way-to-iterate-over-range-es6-7
    const connectFourColumns = [1, 2, 3, 4, 5, 6, 7].map(columnIndex => {
        return <ConnectFourColumn columnIndex={columnIndex}/>
    })

    return <div className="ConnectFourStructure">{connectFourColumns}</div>
}
