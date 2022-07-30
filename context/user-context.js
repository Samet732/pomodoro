import { createContext } from "react";

const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'POMODORO_STOP':
      state.current = action.payload.current;
      state.history = action.payload.history;
      return { ...state };
  }
};

const initialState = {
  name: "Samet Sevindik",
  today: 0, // seconds
  history: [
    // ex: { date: 1020834403, time: 2000 (seconds) }
  ],
  work: 3000,
  break: 600,
  current: "work"
};

export {
  UserContext,
  reducer,
  initialState
};