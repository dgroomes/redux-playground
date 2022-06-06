import "./ConnectFourSpace.css"
import circle from "./circle.svg"
import {Coordinates, MonolithicState, Team} from "./monolithicSlice";
import {useAppSelector} from "./hooks";

type ConnectFourSpaceParams = { coordinates: Coordinates };

export default function ConnectFourSpace(props: ConnectFourSpaceParams) {
    const state: MonolithicState = useAppSelector(state => state.monolithic)

    return (
        <svg className={`ConnectFourSpace ${tokenClass(state, props.coordinates)}`}
             style={fromDomainToCssCoordinate(props.coordinates)}
             viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50"/>
        </svg>)
}

/**
 * The Connect Four domain coordinate system's origin is the bottom left but the CSS grid coordinate system's origin is
 * in the top left.
 *
 * We must translate Connect Four coordinates to CSS grid coordinates.
 *
 * Consider these example spaces and the coordinates that describe them:
 *
 * Space                    Connect Four    CSS Grid
 * =====                    ============    ========
 * Bottom / left              1,1             1,6
 * Second from bottom / left  1,2             1,5
 * Top / left                 1,6             1,1
 *
 * @param coordinates
 */
function fromDomainToCssCoordinate(coordinates: Coordinates): { gridColumn: number, gridRow: number } {
    const gridColumn = coordinates.column
    const gridRow = 7 - coordinates.row
    return {gridColumn, gridRow}
}

function tokenClass(state: MonolithicState, coordinates: Coordinates): string {
    const team: Team = state.columns[coordinates.column - 1][coordinates.row - 1]

    if (team === Team.RED) {
        return "red-token"
    } else if (team === Team.YELLOW) {
        return "yellow-token"
    } else {
        return "open"
    }
}

