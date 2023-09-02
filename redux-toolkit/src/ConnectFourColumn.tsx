import './ConnectFourColumn.css'
import ConnectFourSpace from "./ConnectFourSpace";
import {useAppDispatch, useAppSelector} from "./hooks";
import {dropToken} from "./monolithicSlice"
import {MouseEventHandler} from "react";

type ConnectFourColumnParams = { columnIndex: number };

/**
 * A column in the Connect Four grid.
 *
 * A column is defined as spaces stacked one on top of the other.
 */
export default function ConnectFourColumn(props: ConnectFourColumnParams) {
    const dispatch = useAppDispatch()
    const winner = useAppSelector(state => state.monolithic.present.winner)

    const rowNumbers = [1, 2, 3, 4, 5, 6];
    const connectFourSpaces = rowNumbers.map(rowIndex =>
        <ConnectFourSpace key={rowIndex}
                          coordinates={{
                              column: props.columnIndex,
                              row: rowIndex
                          }}/>)

    let onClick: MouseEventHandler | undefined
    if (winner) {
        onClick = undefined
    } else {
        onClick = function clickColumn() {
            dispatch(dropToken(props.columnIndex))
        }
    }

    return <div className="ConnectFourColumn"
                onClick={onClick}>{connectFourSpaces}</div>
}
