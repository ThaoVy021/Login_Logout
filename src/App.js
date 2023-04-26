import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";

import Products from "./components/products";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import { AuthContext } from "./utils/auth";
import "./App.css";

function App() {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("tokens") || ""
  );
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
        <Routes>
          <Route path="/sign_in" element={<SignIn />} />
        </Routes>
        <Routes>
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
