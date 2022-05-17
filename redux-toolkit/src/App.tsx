import './App.css'
import {increment} from "./counterSlice";
import {useAppDispatch, useAppSelector} from "./hooks";
import ConnectFourBoard from "./ConnectFourBoard";

function App() {
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()

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
            <ConnectFourBoard/>
        </div>
    )
}

export default App
