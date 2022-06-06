import './ConnectFourColumn.css'
import ConnectFourSpace from "./ConnectFourSpace";
import {useAppDispatch} from "./hooks";
import {dropToken} from "./monolithicSlice"

type ConnectFourColumnParams = { columnIndex: number };

/**
 * A column in the Connect Four grid.
 *
 * A column is defined as spaces stacked one on top of the other.
 */
export default function ConnectFourColumn(props: ConnectFourColumnParams) {
    const dispatch = useAppDispatch()

    let connectFourSpaces = [1, 2, 3, 4, 5, 6].map(rowIndex => <ConnectFourSpace key={rowIndex}
                                                                                 coordinates={{
                                                                                     column: props.columnIndex,
                                                                                     row: rowIndex
                                                                                 }}/>)

    return <div className="ConnectFourColumn"
                onClick={() => dispatch(dropToken(props.columnIndex))}>{connectFourSpaces}</div>
}
