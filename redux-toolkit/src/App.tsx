import circle from './circle.svg'
import './App.css'
import {increment} from "./counterSlice";
import {useAppDispatch, useAppSelector} from "./hooks";

function App() {
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()

    // Create the rows of visual elements that make up the Connect Four grid structure.
    //
    // Note: Because we're using React, the creation of React elements that contain child elements has to be done in a
    // nested expression. Why? See the discussion in this StackOverflow question titled "How to append child to React element?"
    // https://stackoverflow.com/questions/58200373/how-to-append-child-to-react-element
    //
    // And how do we write an expression that creates an array of some length? It's surprisingly obscure. See the
    // discussion in this StackOverflow question titled "functional way to iterate over range (ES6/7)"
    // https://stackoverflow.com/questions/30650961/functional-way-to-iterate-over-range-es6-7
    const connectFourRows = [1, 2, 3, 4, 5, 6].map(() => {
        return (<div>
            {[1, 2, 3, 4, 5, 6, 7].map(() => {
                return <img src={circle} className="connect-four-circle" alt="connect-four-space"/>
            })
            }</div>)
    })

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <button type="button" onClick={() => dispatch(increment())}>
                        count is: {count}
                    </button>
                </p>
                <p>
                    Let's play Connect Four!
                </p>
            </header>
            {connectFourRows}
        </div>
    )
}

export default App
