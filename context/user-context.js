import { createContext } from "react";

const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'POMODORO_STOP':
      state.current = action.payload.current;
      state.history = action.payload.history;
      break;

    case 'ACCOUNT_UPDATE':
      state.nickname = action.payload.nickname;
      break;
      
    case 'POMODORO_UPDATE':
      state.work = action.payload.work;
      state.break = action.payload.break;
      break;
  }

  return { ...state };
};

const initialState = {
  nickname: "Samet Sevindik",
  history: [
    // ex: { date: 1020834403, time: 2000 (seconds) }
  ],
  work: 1500,
  break: 300,
  current: "work"
};

export {
  UserContext,
  reducer,
  initialState
};