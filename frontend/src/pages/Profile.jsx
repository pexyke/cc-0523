import React from "react";
import { useAuth } from "../providers/auth";

const Profile = () => {
  const { token } = useAuth();
  console.log(token);

  return (
    <div>
      <p>{token ? "Logged in" : "Anonymus"}</p>
    </div>
  );
};

export default Profile;