import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ method, url, data }) => {
    const access_token = localStorage.getItem("accessJwt");
    if (access_token) {
      try {
        const response = await axios({
          url: baseUrl + url,
          method,
          data,
          headers: { Authorization: `Bearer ${access_token}` },
        });
        return { data: response.data };
      } catch (e) {
        if (e.response) {
          const {
            headers: { message },
          } = e.response;
          return { error: message };
        }
        console.log(e);
      }
    } else {
      return { error: "no access token" };
    }
  };

export default axiosBaseQuery;
