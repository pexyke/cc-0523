import { React, useState, useContext, createContext } from "react";
import http from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const auth = () => {
    const googleBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const searchParams = new URLSearchParams();
    searchParams.append("response_type", "code");
    searchParams.append("client_id", "651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com");
    searchParams.append("redirect_uri", "http://localhost:3000/callback"); // /callback/${provider} later
    searchParams.append("scope", "openid");
    searchParams.append("prompt", "select_account");

    const completeUrl = googleBaseUrl + "?" + searchParams.toString();
    window.open(completeUrl);
  };

  const login = async (code, provider) => {
    try {
      const response = await http.post("http://localhost:4000/api/user/login", {
        code,
        provider,
      });
      console.log("data", response.data);
      setToken(response.data.token);
    } catch (err) {
      console.log(err);
      setToken(null);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, auth, logout, login }}>{children}</AuthContext.Provider>; // provide value for my context
};

// custom hook bro
const useAuth = () => {
  const context = useContext(AuthContext); // read the context and subscribe to its changes
  if (!context) throw new Error("add AuthProvider to route"); // dev help only
  return context;
};

export { AuthProvider, useAuth };