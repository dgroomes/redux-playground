import "./ConnectFourSpace.css"
import circle from "./circle.svg"

type ConnectFourSpaceParams = { columnIndex: number, rowIndex: number };

export default function ConnectFourSpace(props: ConnectFourSpaceParams) {
    return (
        <svg className="ConnectFourSpace" style={{gridColumn: props.columnIndex, gridRow: props.rowIndex}}
             viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50"/>
        </svg>)
}

