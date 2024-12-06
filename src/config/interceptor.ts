import axios from "axios";

export const baseURL = `api/v1`;
const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.code === "ERR_NETWORK") {
      // do something when network error
      //   ShowNotification(error.message, "error");
    }
    console.log(error.code);

    if (error.code === "ERR_BAD_RESPONSE" && error.response.data.message === "Signature verification failed") {
      // do something when signature verification failed
    }

    return new Promise((resolve, reject) => {
      if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
        // do something when token is invalid
      }
      reject(error);
      throw error;
    });
  }
);

api.interceptors.request.use(
  (config: any) => {
    config.headers = {
      "content-type": "application/json",
      "x-project": "ril-ims",
      "x-platform": "admin",
      //   Authorization: `Bearer ${jwtAccessToken}`,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

export const formDataApi = axios.create({
  baseURL: baseURL,
});

// formDataApi.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     ShowNotification(error.response.data.message, "error");
//     return new Promise((resolve, reject) => {
//       if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
//         eventEmitter.emit("onAutoLogout", "Invalid access_token");
//         JwtService.setSession(null, null);
//       }
//       reject(error);
//       throw error;
//     });
//   }
// );
// formDataApi.interceptors.request.use(
//   (config) => {
//     const jwtAccessToken = JwtService.getAccessToken();
//     config.headers = {
//       "content-type": "multipart/form-data",
//       "x-project": "ril-ims",
//       "x-platform": "admin",
//       Authorization: `Bearer ${jwtAccessToken}`,
//     };
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
