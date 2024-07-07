/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import BASE_URL from "@/lib/globalConstant";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      const token = localStorage.getItem("token");
      try {
        if (!token) return;
        const res = await axios.post(`${BASE_URL}/user/currentUser`, {
          token,
        });
        const data = res.data;
        // console.log(data);
        setUser({
          name: data.user.name,
          email: data.user.email,
          id: data.user.id,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCurrentUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
