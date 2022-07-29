import React, { useState } from "react";
import Home from "./components/Home";
import { UserContext } from "./context/user-context";

export default function App() {
  const [user, setUser] = useState({
    name: "Samet Sevindik",
    today: 0, // seconds
    history: [
      // ex: { date: 1020834403, time: 2000 (seconds) }
    ],
    work: 3000,
    break: 600,
    current: "work"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Home />
    </UserContext.Provider>
  );
}