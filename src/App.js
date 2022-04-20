import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./pages/login/LoginForm";
import RegisterForm from "./pages/login/RegisterForm";
import Home from "./pages/home"
import Admin from "./pages/admin"
import NotFound from "./pages/_404";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
