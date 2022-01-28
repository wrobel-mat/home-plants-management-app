import axios from "axios";

const apiPath = "/api/user";

const userApi = {
  login: async ({ username, password }) => {
    try {
      const data = new URLSearchParams();
      data.append("username", username);
      data.append("password", password);
      return await axios.post("/api/login", data);
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  },
  register: async ({ name, email, password, lang }) => {
    try {
      return await axios.post(
        apiPath + "/register?lang=" + lang,
        { email, password, name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  },
  confirmUser: async (confirmationToken, lang) => {
    try {
      const data = new URLSearchParams();
      data.append("token", confirmationToken);
      data.append("lang", lang);
      return await axios.post(apiPath + "/confirm", data);
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  },
  resendConfirmationMail: async ({ resend, userId, lang }) => {
    try {
      const data = new URLSearchParams();
      data.append("resend", resend);
      data.append("userId", userId);
      data.append("lang", lang);
      return await axios.post(apiPath + "/confirm", data);
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  },
  editName: async (data, access_token) => {
    try {
      return await axios.post(apiPath + "/edit-name", data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  },
  editEmail: async (data, access_token, lang) => {
    try {
      return await axios.post(apiPath + "/edit-email?lang=" + lang, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  },
  editPassword: async (data, access_token, lang) => {
    try {
      return await axios.post(apiPath + "/edit-password?lang=" + lang, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  },
  deleteUserAccount: async (access_token, lang) => {
    try {
      return await axios.delete(apiPath + "?lang=" + lang, {
        headers: { Authorization: `Bearer ${access_token}`}
      });
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  },
  getMe: async (access_token) => {
    try {
      return await axios.get(apiPath + "/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  },
  refreshToken: async (refresh_token) => {
    try {
      return await axios.get(apiPath + "/refresh-jwt", {
        headers: { Authorization: `Bearer ${refresh_token}` },
      });
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      console.log(e);
    }
  }
};

export default userApi;
