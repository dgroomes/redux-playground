import {createSlice, PayloadAction} from '@reduxjs/toolkit'

/*
I'm not sure I care to "slice up" my Redux stuff into more than one slice because this app is so small. So, somewhat
tongue-in-cheek, I'll name this the "monolithic slice".

Am I supposed to put other functions in this file? Like for example, a "teamOrginalValueToStringValue()" (or more concisely
named) function? Am I meant to jam pure domain code into a Redux construct? Vendor lock-in?
*/

export enum Team {
    RED,
    YELLOW
}

export function teamToString(team: Team): string {
    // Note: I know I could encode a string into the enum (see 'String enums': https://www.typescriptlang.org/docs/handbook/enums.html#string-enums)
    // but I dont' feel like it. I'm a bit surprised that enums can't have multiple fields (see https://stackoverflow.com/a/57462364)
    // (maybe I shouldn't be, maybe it's weird that Java has that feature) and I'm surprised how many other features there
    // are of TypeScript enums, like "computed constant members". Anyway, I'm going to stay away from TypeScript enum
    // features for now.

    if (team === Team.RED) {
        return "🔴"
    } else {
        return "🟡"
    }
}

export interface MonolithicState {
    activeTeam: Team
    columns: Team[][]
    winner: boolean
}

/**
 * The coordinates of a token on the game board. The origin is the bottom left.
 *
 * For example, for a token placed in the bottom left, it has coordinates
 * column=1 and row=1. Notice that it is 1-indexed and not 0-indexed.
 */
export type Coordinates = { column: number, row: number }

// Define the initial state using that type
const initialState: MonolithicState = {
    activeTeam: Team.RED,
    columns: [[], [], [], [], [], [], [], []],
    winner: false
}

export const monolithicSlice = createSlice({
    name: 'monolithic',
    initialState,
    reducers: {

        /**
         * Drop a circular token into the given column.
         */
        dropToken(state, action: PayloadAction<number>) {
            const column = action.payload;
            const row = state.columns[column - 1].push(state.activeTeam)
            const coordinates: Coordinates = {column, row}

            if (checkForWinHorizontally(state, coordinates) ||
                checkForWinVertically(state, coordinates) ||
                checkForWinSlopeUp(state, coordinates) ||
                checkForWinSlopeDown(state, coordinates)) {

                state.winner = true
                return
            }

            // check diagonal slope up

            // Turn over to the other team.
            if (state.activeTeam === Team.RED) {
                state.activeTeam = Team.YELLOW;
            } else {
                state.activeTeam = Team.RED;
            }
        }
    }
})

/**
 * Check for a win condition on the horizontal axis.
 *
 * This is very verbose! This would be more naturally implemented as a recursive algorithm
 * or just a better version of what I wrote. But I'm trying to "just do it" and (or "ship it") before cleaning it up.
 */
function checkForWinHorizontally(state: MonolithicState, coordinates: Coordinates): boolean {
    const {column, row} = coordinates

    let connectedInARow = 1
    let lookDistance = 1
    let horizontalState = "looking-left"

    while (horizontalState != "done") {
        if (connectedInARow === 4) {
            return true
        }

        if (horizontalState === "looking-left") {
            const col = state.columns[column - 1 - lookDistance]
            if (col === undefined) {
                horizontalState = "looking-right"
                lookDistance = 1
                continue;
            }
            const spaceState = col[row - 1]
            if (spaceState === undefined) {
                horizontalState = "looking-right"
                lookDistance = 1
                continue;
            }

            if (spaceState === state.activeTeam) {
                connectedInARow++
                lookDistance++
                continue;
            } else {
                horizontalState = "looking-right"
                lookDistance = 1
                continue;
            }
        }

        if (horizontalState === "looking-right") {
            const col = state.columns[column - 1 + lookDistance]
            if (col === undefined) {
                horizontalState = "done"
                continue;
            }
            const spaceState = col[row - 1]
            if (spaceState === undefined) {
                horizontalState = "done"
                continue;
            }

            if (spaceState === state.activeTeam) {
                connectedInARow++
                lookDistance++
            } else {
                horizontalState = "done"
            }
        }
    }

    return false
}

/**
 * Check for a win condition on the vertical axis.
 *
 * Implementation note: there is no need to "look up" because there can't be tokens above the just dropped token.
 */
function checkForWinVertically(state: MonolithicState, coordinates: Coordinates): boolean {
    const {column, row} = coordinates
    const col = state.columns[column - 1]

    let connectedInARow = 1
    let lookDistance = 1
    let verticalState = "looking-down"

    while (verticalState != "done") {
        if (connectedInARow === 4) {
            return true
        }

        const spaceState = col[row - 1 - lookDistance]
        if (spaceState === undefined) {
            verticalState = "done"
            continue;
        }

        if (spaceState === state.activeTeam) {
            connectedInARow++
            lookDistance++
        } else {
            verticalState = "done"
        }
    }

    return false
}

/**
 * Check for a win condition on the diagonal axis sloping up.
 * @param state
 * @param coordinates
 */
function checkForWinSlopeUp(state: MonolithicState, coordinates: Coordinates): boolean {
    const {column, row} = coordinates

    let connectedInARow = 1
    let lookDistance = 1
    let lookingState = "looking-down-left"

    while (lookingState != "done") {
        if (connectedInARow === 4) {
            return true
        }

        if (lookingState === "looking-down-left") {
            const col = state.columns[column - 1 - lookDistance]
            if (col === undefined) {
                lookingState = "looking-up-right"
                lookDistance = 1
                continue;
            }
            const spaceState = col[row - 1 - lookDistance]
            if (spaceState === undefined) {
                lookingState = "looking-up-right"
                lookDistance = 1
                continue;
            }

            if (spaceState === state.activeTeam) {
                connectedInARow++
                lookDistance++
                continue;
            } else {
                lookingState = "looking-up-right"
                lookDistance = 1
                continue;
            }
        }

        if (lookingState === "looking-up-right") {
            const col = state.columns[column - 1 + lookDistance]
            if (col === undefined) {
                lookingState = "done"
                continue;
            }
            const spaceState = col[row - 1 + lookDistance]
            if (spaceState === undefined) {
                lookingState = "done"
                continue;
            }

            if (spaceState === state.activeTeam) {
                connectedInARow++
                lookDistance++
            } else {
                lookingState = "done"
            }
        }
    }

    return false
}

/**
 * Check for a win condition on the diagonal axis sloping down.
 * @param state
 * @param coordinates
 */
function checkForWinSlopeDown(state: MonolithicState, coordinates: Coordinates): boolean {
    const {column, row} = coordinates

    let connectedInARow = 1
    let lookDistance = 1
    let lookingState = "looking-up-left"

    while (lookingState != "done") {
        if (connectedInARow === 4) {
            return true
        }

        if (lookingState === "looking-up-left") {
            const col = state.columns[column - 1 - lookDistance]
            if (col === undefined) {
                lookingState = "looking-down-right"
                lookDistance = 1
                continue;
            }
            const spaceState = col[row - 1 + lookDistance]
            if (spaceState === undefined) {
                lookingState = "looking-down-right"
                lookDistance = 1
                continue;
            }

            if (spaceState === state.activeTeam) {
                connectedInARow++
                lookDistance++
                continue;
            } else {
                lookingState = "looking-down-right"
                lookDistance = 1
                continue;
            }
        }

        if (lookingState === "looking-down-right") {
            const col = state.columns[column - 1 + lookDistance]
            if (col === undefined) {
                lookingState = "done"
                continue;
            }
            const spaceState = col[row - 1 - lookDistance]
            if (spaceState === undefined) {
                lookingState = "done"
                continue;
            }

            if (spaceState === state.activeTeam) {
                connectedInARow++
                lookDistance++
            } else {
                lookingState = "done"
            }
        }
    }

    return false
}


export const {dropToken} = monolithicSlice.actions

export default monolithicSlice.reducer
