import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMessage } from "providers/MessageProvider";
import { useAuth } from "providers/AuthProvider";
import AuthenticatedApp from "views/AuthenticatedApp";
import UnauthenticatedApp from "views/UnauthenticatedApp";

function Root() {
  const { clearError, clearSuccess } = useMessage();
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => {
    clearError();
    clearSuccess();
  }, [pathname]);
  return <>{isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
}

export default Root;
