import './App.css'
import {useAppDispatch, useAppSelector} from "./hooks";
import ConnectFourBoard from "./ConnectFourBoard";
import {teamToString} from "./monolithicSlice";
import {ActionCreators} from "redux-undo";

function App() {
    const activeTeam = teamToString(useAppSelector(state => state.monolithic.present.activeTeam))
    const winner = useAppSelector(state => state.monolithic.present.winner)
    const dispatch = useAppDispatch()

    return (
        <div className="App">
            <header className="App-header">
                <p>Let's play Connect Four!</p>
                {winner ? <p>{activeTeam} Wins! 🎉</p> : <p>It's {activeTeam}'s turn.</p>}
            </header>
            <ConnectFourBoard/>
            <p>
                <button type="button" onClick={() => dispatch(ActionCreators.undo())}>
                    Undo
                </button>
            </p>
        </div>
    )
}

export default App
