import React, { useContext, useEffect, useState } from "react";
import { useApi } from "providers/ApiProvider";

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const { authenticate, getMe, removeTokens, refreshTokens } = useApi();
  const [user, setUser] = useState(undefined);

  const login = async ({ username, password }) => {
    await authenticate({ username, password });
    const user = await getMe();
    setUser(user);
  };

  const isAuthenticated = user !== undefined;

  const reloadUser = async () => {
    const user = await getMe();
    setUser(user);
  };

  const logout = () => {
    removeTokens();
    setUser(undefined);
  };

  const authFallback = async (callback) => {
    await refreshTokens(callback);
    if (!localStorage.accessJwt && !localStorage.refreshJwt) {
      setUser(undefined);
    }
  };

  useEffect(() => {
    reloadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        isAuthenticated,
        reloadUser,
        user,
        logout,
        authFallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    console.log("useAuth needs to be used inside AuthContext");
  }
  return auth;
};

export default AuthProvider;
