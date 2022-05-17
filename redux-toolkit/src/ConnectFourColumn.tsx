import './ConnectFourColumn.css'
import circle from "./circle.svg"

type ConnectFourColumnParams = { columnIndex: number };

/**
 * A column in the Connect Four grid.
 */
export default function ConnectFourColumn(props: ConnectFourColumnParams) {

    let connectFourSpaces = [1, 2, 3, 4, 5, 6].map(rowIndex => {
        return <img src={circle} className="connect-four-circle"
                    style={{gridColumn: props.columnIndex, gridRow: rowIndex}} alt="connect-four-space"/>
    })

    return <div className="ConnectFourColumn">{connectFourSpaces}</div>
}
