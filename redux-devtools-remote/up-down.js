/*
Read 'up' and 'down' commands from the command line and updates the Redux state accordingly.
*/

const redux = require('redux');
const { devToolsEnhancer } = require('@redux-devtools/remote');

const initialState = {
    count: 0
};

function reduce(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
}

const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });

const store = redux.createStore(reduce, devToolsEnhancer({ realtime: true }));

store.subscribe(() => console.log(`Count: ${store.getState().count}`));

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Type 'up' to increment and 'down' to decrement. Type 'exit' to quit.");

function readInput() {
    readline.question('', (input) => {
        switch (input.trim().toLowerCase()) {
            case 'up':
                store.dispatch(increment());
                break;
            case 'down':
                store.dispatch(decrement());
                break;
            case 'exit':
                readline.close();
                return;
            default:
                console.log("Invalid input. Please type 'up', 'down', or 'exit'.");
        }
        readInput();
    });
}

readInput();

readline.on('close', () => {
    console.log('Exiting program.');
    process.exit(0);
});
