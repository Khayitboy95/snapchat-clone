import { combineReducers, createStore } from "redux";
import appReducer from "./appReducer";
import cameraReducer from "./cameraReducer";

const reducers = combineReducers({
    app:appReducer,
    camera: cameraReducer
})

const store = createStore(reducers);

window.store = store;

export default store;