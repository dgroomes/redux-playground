import {createSlice} from '@reduxjs/toolkit'


// Define a type for the slice state
interface CounterState {
    value: number
}

// Define the initial state using that type
const initialState: CounterState = {
    value: 0
}

/**
 * Starting with a the 'counterSlice' from the Redux docs, just to get started. This will turn into the connectFourSlice
 * or something like that.
 */
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.value += 1
        },
        decrement(state) {
            state.value -= 1
        }
    }
})

export const {increment, decrement} = counterSlice.actions

export default counterSlice.reducer
