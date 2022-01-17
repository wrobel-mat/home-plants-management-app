import { BrowserRouter as Router } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import LocalizedStringsProvider from "providers/LocalizedStringsProvider";
import MessageProvider from "providers/MessageProvider";
import ApiProvider from "providers/ApiProvider";
import AuthProvider from "providers/AuthProvider";
import store from "store";

export default function AppProviders({ children }) {
  return (
    <Router>
      <LocalizedStringsProvider>
        <MessageProvider>
          <ApiProvider>
            <AuthProvider>
              <StoreProvider store={store}>{children}</StoreProvider>
            </AuthProvider>
          </ApiProvider>
        </MessageProvider>
      </LocalizedStringsProvider>
    </Router>
  );
}
