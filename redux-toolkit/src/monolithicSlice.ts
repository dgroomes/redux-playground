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

export function teamToString(team: Team) : string {
    // Note: I know I could encode a string into the enum (see 'String enums': https://www.typescriptlang.org/docs/handbook/enums.html#string-enums)
    // but I dont' feel like it. I'm a bit surprised that enums can't have multiple fields (see https://stackoverflow.com/a/57462364)
    // (maybe I shouldn't be, maybe it's weird that Java has that feature) and I'm surprised how many other features there
    // are of TypeScript enums, like "computed constant members". Anyway, I'm going to stay away from TypeScript enum
    // features for now.

    if (team === Team.RED) {
        return "Red"
    } else {
        return "Yellow"
    }
}


interface MonolithicState {
    activeTeam: Team
    columns: Team[][]
}

// Define the initial state using that type
const initialState: MonolithicState = {
    activeTeam: Team.RED,
    columns: [[], [], [], [], [], [], [], []]
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
            state.columns[column].push(state.activeTeam)

            // TODO check win condition

            // Turn over to the other team.
            if (state.activeTeam === Team.RED) {
                state.activeTeam = Team.YELLOW;
            } else {
                state.activeTeam = Team.RED;
            }
        }
    }
})

export const {dropToken} = monolithicSlice.actions

export default monolithicSlice.reducer
