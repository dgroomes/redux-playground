import { configureStore } from '@reduxjs/toolkit'
import monolithicReducer from './monolithicSlice'
import undoable from 'redux-undo'

export const store = configureStore({
    reducer: {
        monolithic: undoable(monolithicReducer)
    }
})

// I don't understand how this works, but this is needed when using Redux Toolkit with TypeScript.
// See https://redux.js.org/tutorials/typescript-quick-start
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
