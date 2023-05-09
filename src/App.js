import { useState } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import Products from "./components/products";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import User from "./components/user";

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
          <Route path={"/home" && "/home/*"} element={<Products />} />

          <Route path="/sign_in" element={<SignIn />} />

          <Route path="/sign_up" element={<SignUp />} />

          <Route path={"/user" && "/user/*"} element={<User />} />

          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
