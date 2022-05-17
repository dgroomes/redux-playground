import './ConnectFourColumn.css'
import ConnectFourSpace from "./ConnectFourSpace";

type ConnectFourColumnParams = { columnIndex: number };

/**
 * A column in the Connect Four grid.
 */
export default function ConnectFourColumn(props: ConnectFourColumnParams) {

    let connectFourSpaces = [1, 2, 3, 4, 5, 6].map(rowIndex => <ConnectFourSpace columnIndex={props.columnIndex}
                                                                                 rowIndex={rowIndex}/>)

    return <div className="ConnectFourColumn">{connectFourSpaces}</div>
}
