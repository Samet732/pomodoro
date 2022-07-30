import React, { useReducer } from "react";
import Home from "./components/Home";
import { initialState, reducer, UserContext } from "./context/user-context";

export default function App() {
  const [user, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <Home />
    </UserContext.Provider>
  );
}