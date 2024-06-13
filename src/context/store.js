// import { configureStore } from '@reduxjs/toolkit'
import {createStore} from "redux";
// import myReducer from './reducers'



// const Store = createStore(
//   myReducer ,
//   window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
// )

// export default Store


import { configureStore } from '@reduxjs/toolkit';
import myReducer from './reducers';

const store = configureStore({
  reducer: {
    home: myReducer,
  },
  devTools: true // Enable Redux DevTools Extension
});

export default store;

