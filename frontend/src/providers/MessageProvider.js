import React, { useState, useContext } from "react";

const MessageContext = React.createContext({});

const MessageProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatchError = (message) => {
    clearSuccess();
    setError(message);
  };

  const dispatchSuccess = (message) => {
    clearError();
    setSuccess(message);
  };

  const clearError = () => {
    if (error) {
      setError(null);
    }
  };

  const clearSuccess = () => {
    if (success) {
      setSuccess(null);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        error,
        dispatchError,
        clearError,
        success,
        dispatchSuccess,
        clearSuccess,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const message = useContext(MessageContext);

  if (!message) {
    console.warn("useMessage needs to be used inside MessageContext");
  }

  return message;
};

export default MessageProvider;
