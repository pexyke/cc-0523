import  React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Protected = ({ children }) => {
  const { token, user } = useAuth();
  // const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {!token ? (
        <Navigate to={"/"} />
      ) : !user.userId && location.pathname !== "/register" ? (
        <Navigate to={"/register"} />
      ) : (
        children
      )}
    </div>
  );
};

export default Protected;