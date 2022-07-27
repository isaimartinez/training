import { configureStore } from '@reduxjs/toolkit'
import viewReducer from './reducers/viewSlice'
import dataReducer from './reducers/dataSlice'

export const store = configureStore({
  reducer: {
    view: viewReducer,
    data: dataReducer
  },
})