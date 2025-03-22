import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../../../Components/detailsListComponent/ReducersDetails";

const store = configureStore({
  reducer: {
    games: gameReducer
  }
});

export default store;
