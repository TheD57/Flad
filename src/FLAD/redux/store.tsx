import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';

// Reference here all your application reducers
const reducer = {
  appReducer: appReducer,
  userReducer: userReducer
}

const store = configureStore({
  reducer: reducer,
},);

export default store;