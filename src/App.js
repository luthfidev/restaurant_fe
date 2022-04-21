import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { SemanticToastContainer } from "react-semantic-toasts";

import LoginForm from "./pages/login/LoginForm";
import RegisterForm from "./pages/login/RegisterForm";
import Home from "./pages/home";
import Admin from "./pages/admin";
import NotFound from "./pages/_404";
import Unauthorized from "./pages/_401";
import RequireAuth from "./components/RequireAuth";

function App() {

  const ROLES = {
    User: 2,
    Admin: 1,
  };

  return (
    <>
      <SemanticToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          {/* <Route path="/Admin" element={<Admin />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
