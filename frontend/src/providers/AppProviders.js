import { BrowserRouter as Router } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import LocalizedStringsProvider from "providers/LocalizedStringsProvider";
import MessageProvider from "providers/MessageProvider";
import UserApiProvider from "providers/UserApiProvider";
import AuthProvider from "providers/AuthProvider";
import store from "store";

export default function AppProviders({ children }) {
  return (
    <Router>
      <LocalizedStringsProvider>
        <MessageProvider>
          <UserApiProvider>
            <AuthProvider>
              <StoreProvider store={store}>{children}</StoreProvider>
            </AuthProvider>
          </UserApiProvider>
        </MessageProvider>
      </LocalizedStringsProvider>
    </Router>
  );
}
