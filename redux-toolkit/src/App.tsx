import './App.css'
import {useAppDispatch, useAppSelector} from "./hooks";
import ConnectFourBoard from "./ConnectFourBoard";
import {teamToString} from "./monolithicSlice";

function App() {
    const activeTeam = teamToString(useAppSelector(state => state.monolithic.activeTeam))
    const winner = useAppSelector(state => state.monolithic.winner)
    const dispatch = useAppDispatch()

    return (
        <div className="App">
            <header className="App-header">
                <p>Let's play Connect Four!</p>
                {winner ? <p>{activeTeam} Wins! 🎉</p> : <p>It's {activeTeam}'s turn.</p>}
            </header>
            <ConnectFourBoard/>
            <p>
                <button type="button">
                    {/* Not yet implemented */}
                    Undo
                </button>
            </p>
        </div>
    )
}

export default App
