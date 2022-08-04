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
  history: [
    // ex: { date: 1020834403, time: 2000 (seconds) }
    { date: new Date(2021, 6, 27).getTime(), time: 3000 },
    { date: new Date(2022, 6, 24).getTime(), time: 3000 },
    { date: new Date(2022, 6, 25).getTime(), time: 3000 },
    { date: new Date(2022, 6, 26).getTime(), time: 3000 },
    { date: new Date(2022, 6, 27).getTime(), time: 3000 },
    { date: new Date(2022, 6, 28).getTime(), time: 3000 },
    { date: new Date(2022, 6, 29).getTime(), time: 3000 },
    { date: new Date(2022, 7, 1).getTime(), time: 3000 },
    { date: new Date(2022, 7, 2).getTime(), time: 3000 },
    { date: new Date(2022, 7, 2).getTime(), time: 6000 },
    { date: new Date(2022, 7, 3).getTime(), time: 3000 },
    { date: new Date(2022, 7, 3).getTime(), time: 6000 },
    { date: new Date(2022, 7, 4).getTime(), time: 3000 },
    { date: new Date(2022, 7, 4).getTime(), time: 6000 }
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