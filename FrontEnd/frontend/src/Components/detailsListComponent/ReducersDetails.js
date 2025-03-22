import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  selectedGame: null
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    selectGame: (state, action) => {
      state.selectedGame = action.payload;
    }
  }
});

export const { setGames, selectGame } = gameSlice.actions;
export default gameSlice.reducer;
