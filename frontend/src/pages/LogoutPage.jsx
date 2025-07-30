// pages/Logout.jsx

import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout(); // call logout on mount
  }, [logout]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-lg font-medium text-gray-700">Logging out...</div>
    </div>
  );
};

export default Logout;
