import React, { useContext, useState } from "react";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useMessage } from "providers/MessageProvider";
import userApi from "api/user";

const ApiContext = React.createContext({});

const setAccessToken = (access_token) => {
  localStorage.setItem("accessJwt", access_token);
};
const getAccessToken = () => {
  return localStorage.getItem("accessJwt");
};
const removeAccessToken = () => {
  localStorage.removeItem("accessJwt");
};
const setRefreshToken = (refresh_token) => {
  localStorage.setItem("refreshJwt", refresh_token);
};
const getRefreshToken = () => {
  return localStorage.getItem("refreshJwt");
};
const removeRefreshToken = () => {
  localStorage.removeItem("refreshJwt");
};

const UserApiProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { strings, getLanguage } = useLocalizedStrings();
  const { dispatchError, dispatchSuccess } = useMessage();

  const RESPONSE_ACTION_MAP = {
    200: (message) => async (...[response, callback, successHandler]) => {
      switch (message) {
        case "Authentication Successful": {
          const { data: { access_token, refresh_token }} = response;
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          setIsLoading(false);
          return {};
        }
        case "Get Me Successful": {
          const { data } = response;
          setIsLoading(false);
          return data;
        }
        case "Confirm User Successful":
        case "Resend Confirmation Successful": {
          const { headers: { message } } = response;
          setIsLoading(false);
          dispatchSuccess(strings.serverResponseMessage[message]);
          break;
        }
        case  "Edit User Name Successful": {
          const { headers: { message }} = response;
          setIsLoading(false);
          dispatchSuccess(strings.serverResponseMessage[message]);
          successHandler();
          return {};
        }
        case "Edit User Email Successful": {
          const { data: { email }, headers: { message }} = response;
          const { args: { credentials: { password }}} = callback;
          setIsLoading(false);
          await authenticate({ username: email, password });
          dispatchSuccess(strings.serverResponseMessage[message]);
          successHandler();
          return {};
        }
        case "Edit User Password Successful": {
          const { headers: { message }, config: { data }} = response;
          const { args: { credentials: { username }}} = callback;
          setIsLoading(false);
          const { password } = JSON.parse(data);
          await authenticate({ username, password });
          dispatchSuccess(strings.serverResponseMessage[message]);
          successHandler();
          return {};
        }
        case "Delete User Successful": {
          setIsLoading(false);
          successHandler();
          return {};
        }
        case "Refresh JWT Successful": {
          const { data: { access_token, refresh_token } } = response;
          const { callbackFn, args } = callback;
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          return await callbackFn(args);
        }
      }
    },
    201: (message) => (response) => {
      switch (message) {
        case "Register User Successful": {
          const { headers: { message } } = response;
          setIsLoading(false);
          dispatchSuccess(strings.serverResponseMessage[message]);
          return {};
        }
      }
    },
    400: (message) => () => {
      setIsLoading(false);
      return { error: message };
    },
    401: (message) => async (...[, callback]) => {
      switch (message) {
        case "Access JWT Invalid": {
          return await refreshTokens(callback);
        }
        case "Refresh JWT Invalid": {
          removeTokens();
          setIsLoading(false);
        }
      }
    },
    403: (message) => (response) => {
      switch (message) {
        case "Bad credentials":
        case "User is disabled": {
          const { headers: { message } } = response;
          setIsLoading(false);
          dispatchError(strings.serverResponseMessage[message]);
          return { error: message };
        }
        case "Confirmation Token Not Expired": {
          const { headers: { message } } = response;
          setIsLoading(false);
          dispatchError(strings.serverResponseMessage[message]);
          break;
        }
        case "User Already Confirmed": {
          const { headers: { message } } = response;
          setIsLoading(false);
          dispatchSuccess(strings.serverResponseMessage[message]);
          break;
        }
        case "User Already Registered": {
          const { headers: { message } } = response;
          setIsLoading(false);
          return { error: message };
        }
        case "Confirmation Token Expired": {
          const { data: { query }, headers: { message }} = response;
          setIsLoading(false);
          dispatchError(strings.serverResponseMessage[message]);
          return query;
        }
      }
    },
    404: (message) => () => {
      setIsLoading(false);
      dispatchError(strings.serverResponseMessage[message]);
      return {};
    },
    500: (message) => (response) => {
      switch (message) {
        case "Email Connection Refused": {
          const { headers: { message } } = response;
          setIsLoading(false);
          dispatchError(strings.serverResponseMessage[message]);
          return {};
        }
        default: {
          setIsLoading(false);
          dispatchError(strings.serverResponseMessage["serverError"]);
        }
      }
    },
  };

  // non-authorized requests

  const authenticate = async ({ username, password }) => {
    setIsLoading(true);
    const response = await userApi.login({ username, password });
    const {
      status,
      headers: { message },
    } = response;
    return RESPONSE_ACTION_MAP[status](message)(response);
  };

  const registerUser = async ({ name, email, password }) => {
    setIsLoading(true);
    const lang = getLanguage();
    const response = await userApi.register({ name, email, password, lang });
    const {
      status,
      headers: { message },
    } = response;
    return RESPONSE_ACTION_MAP[status](message)(response);
  };

  const confirmUser = async (confirmationToken) => {
    setIsLoading(true);
    const lang = getLanguage();
    const response = await userApi.confirmUser(confirmationToken, lang);
    const {
      status,
      headers: { message },
    } = response;
    return RESPONSE_ACTION_MAP[status](message)(response);
  };

  const resendConfirmationMail = async ({ resend, userId }) => {
    setIsLoading(true);
    const lang = getLanguage();
    const response = await userApi.resendConfirmationMail({
      resend,
      userId,
      lang
    });
    const {
      status,
      headers: { message },
    } = response;
    RESPONSE_ACTION_MAP[status](message)(response);
  };

  // authorized requests
  // - if 'access_token' is present perform request
  // - get status and message from server response
  // - create 'callback' object: { callbackFn: 'this function', args: 'this args' }
  // - if 'access_token' is valid => proceed with request: dispatch success | error
  // - if 'access_token' is invalid:
  //      - use fallback function: refreshTokens(callback)
  //      - if refresh tokens successful:
  //          - set refreshed tokens in local storage
  //          - trigger callbackFn(args)
  //      - if refresh tokens unsuccessful => remove tokens

  const getMe = async () => {
    setIsLoading(true);
    const access_token = getAccessToken();
    if (access_token) {
      const response = await userApi.getMe(access_token);
      const {
        status,
        headers: { message },
      } = response;
      const callback = { callbackFn: getMe };
      return await RESPONSE_ACTION_MAP[status](message)(response, callback);
    }
    setIsLoading(false);
  };

  const editUserName = async ({ data, successHandler }) => {
    setIsLoading(true);
    const access_token = getAccessToken();
    if (access_token) {
      const response = await userApi.editName(data, access_token);
      const {
        status,
        headers: { message },
      } = response;
      const callback = {
        callbackFn: editUserName,
        args: { data, successHandler },
      };
      return await RESPONSE_ACTION_MAP[status](message)(response, callback, successHandler);
    }
    setIsLoading(false);
  };

  const editUserEmail = async ({ credentials, data, successHandler }) => {
    setIsLoading(true);
    const { error } = await authenticate(credentials);
    if (error) {
      setIsLoading(false);
      return { error };
    } else {
      const access_token = getAccessToken();
      const lang = getLanguage();
      if (access_token) {
        const response = await userApi.editEmail(data, access_token, lang);
        const {
          status,
          headers: { message },
        } = response;
        const callback = {
          callbackFn: editUserEmail,
          args: { credentials, data, successHandler },
        };
        return await RESPONSE_ACTION_MAP[status](message)(
          response,
          callback,
          successHandler
        );
      }
      setIsLoading(false);
    }
  };

  const editUserPassword = async ({ credentials, data, successHandler }) => {
    setIsLoading(true);
    const { error } = await authenticate(credentials);
    if (error) {
      setIsLoading(false);
      return { error };
    } else {
      const access_token = getAccessToken();
      const lang = getLanguage();
      if (access_token) {
        const response = await userApi.editPassword(data, access_token, lang);
        const {
          status,
          headers: { message },
        } = response;
        const callback = {
          callbackFn: editUserPassword,
          args: { credentials, data, successHandler },
        };
        return await RESPONSE_ACTION_MAP[status](message)(
          response,
          callback,
          successHandler
        );
      }
      setIsLoading(false);
    }
  };

  const deleteUserAccount = async ({credentials, successHandler}) => {
    setIsLoading(true);
    const { error } = await authenticate(credentials);
    if (error) {
      setIsLoading(false);
      return { error };
    } else {
      const access_token = getAccessToken();
      const lang = getLanguage();
      if (access_token) {
        const response = await userApi.deleteUserAccount(access_token, lang);
        const {
          status,
          headers: { message }
        } = response;
        const callback = {
          callbackFn: deleteUserAccount,
          args: { credentials, successHandler }
        };
        return await RESPONSE_ACTION_MAP[status](message)(
          response,
          callback,
          successHandler
        );
      }
      setIsLoading(false);
    }
  };

  // == logout
  const removeTokens = () => {
    removeAccessToken();
    removeRefreshToken();
  };

  // fallback function for authorized requests when access_token is expired / invalid
  const refreshTokens = async (callback) => {
    const refresh_token = getRefreshToken();
    if (refresh_token) {
      const response = await userApi.refreshToken(refresh_token);
      const {
        status,
        headers: { message },
      } = response;
      return await RESPONSE_ACTION_MAP[status](message)(response, callback);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        isLoading,
        authenticate,
        getMe,
        refreshTokens,
        removeTokens,
        registerUser,
        confirmUser,
        resendConfirmationMail,
        editUserName,
        editUserEmail,
        editUserPassword,
        deleteUserAccount
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const api = useContext(ApiContext);

  if (!api) {
    console.warn("useApi needs to be used inside ApiContext");
  }

  return api;
};

export default UserApiProvider;
