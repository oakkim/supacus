import { combineReducers } from "redux"
import { userReducer } from "./user"
import { configureStore } from "@reduxjs/toolkit"

export const rootReducer = combineReducers({
    user: userReducer
})
export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer
})

export default store