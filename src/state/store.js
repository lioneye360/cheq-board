import { createStore } from "redux";
import rootReducers from "./reducers";

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistenceState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStorage and convert into an Object
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistenceState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// create our store from rootReducers and use loadFromLocalStorage
const store = createStore(rootReducers, loadFromLocalStorage());

// listen for store changes and use saveToLocalStorage to save them in localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;