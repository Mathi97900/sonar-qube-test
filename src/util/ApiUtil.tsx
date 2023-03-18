/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import api from '../common/config';
import store from '../store';
import { userReducerConstant } from '../store/reducerConstant';

const axios = require('axios');

// const navigate = useNavigate();
// const dispatch = useDispatch();

const ApiUtil = {
  storeToken: (credentials: any) => {
    const getCredentials: any = localStorage.getItem('credentials');
    let localCredentials: any = JSON.parse(getCredentials);

    if (localCredentials?.refresh_token && localCredentials?.access_token) {
      /* The refresh_token api doesn't return refresh_token. in that case we keep
       * Existing refresh token
       */
      localCredentials = {
        ...localCredentials,
        ...credentials
      };
      localStorage.setItem('credentials', JSON.stringify(localCredentials));
    } else {
      localStorage.setItem('credentials', JSON.stringify(credentials));
    }
  },

  nullifyToken: () => localStorage.removeItem('credentials'),
  getWithToken: (url: string) => new Promise((resolve, reject) => {
    const credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
    if (credentials?.access_token) {
      axios
        .get(`${api}/${url}`, {
          headers: {
            'x-access-token': credentials.access_token,
            'x-access-token-type': credentials.token_type
          }
        })
        .then((response: object) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    } else {
      reject(new Error('token is not valid'));
    }
  }),
  postWithToken: (url: string, data: any, option = {}) => new Promise((resolve, reject) => {
    const credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
    if (credentials?.access_token) {
      let headerObj = {
        headers: {
          'x-access-token': credentials.access_token,
          zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          'timezone-offset': new Date().getTimezoneOffset()
        }
      };

      headerObj = { ...option, ...headerObj };
      axios
        .post(`${api}/${url}`, data, headerObj)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    }
  }),
  loginUser: (url: string, data: any) => new Promise((resolve, reject) => {
    axios
      .post(`${api}/${url}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((result: any) => {
        // if (result?.data) {
        //   ApiUtil.storeToken(result.data);
        // }
        resolve(result);
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  }),
  postData: (url: string, data: any) => new Promise((resolve, reject) => {
    axios
      .post(`${api}/${url}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((result: any) => {
        resolve(result);
      })
      .catch((err: any) => {
        reject(err);
      });
  }),
  putWithToken: (url: string, data: any) => new Promise((resolve, reject) => {
    const credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
    if (credentials?.access_token) {
      const headerObj = {
        headers: {
          'x-access-token': credentials.access_token,
          zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          'timezone-offset': new Date().getTimezoneOffset()
        }
      };

      axios
        .put(`${api}/${url}`, data, headerObj)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    }
  }),
  deleteWithToken: (url: string) => new Promise((resolve, reject) => {
    const credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
    if (credentials?.access_token) {
      const headerObj = {
        headers: {
          'x-access-token': credentials.access_token,
          zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          'timezone-offset': new Date().getTimezoneOffset()
        }
      };

      axios
        .delete(`${api}/${url}`, headerObj)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    }
  })
};

/*
 *The interceptors execute before every response
 * If the response is ok we do nothing with it
 * but if there is error we firstly check if response status equals to 401(unauthorized)
 * If it true, we’re trying to refresh token.
 */
axios.interceptors.response.use(
  (response: any) => response,
  (error: any) => new Promise((resolve, reject) => {
    const originalRequest = error.config;
    const credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
    if (
      error.response
      && error.response.status === 401
      && error.config
      // eslint-disable-next-line no-underscore-dangle
      && !error.config.__isRetryRequest
      && credentials?.refresh_token
    ) {
      originalRequest._retry = true;
      /*
         *  why We use fetch function instead of axios here?
         * if we would use axios to refresh, and refreshing will be successful
         * the app will receive token refreshing result instead of result of auth field request.
         * Therefore, it remains for us to use fetch
         */

      const response = fetch(`${api}/auth/refreshToken`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': credentials.refresh_token,
          zone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP status ${res.status}`);
          }
          return res.json();
        })
        .then((res) => {
          const { access_token, refresh_token, stores } = res;
          store.dispatch({ type: userReducerConstant.STORE_LIST, value: stores });
          ApiUtil.storeToken({ access_token, refresh_token });

          // Requesting again
          originalRequest.headers['x-access-token'] = res.access_token;
          return axios(originalRequest);
        })
        .catch(() => {
          // logout
          localStorage.removeItem('credentials');
          // store.dispatch(loginAction(true));
          // navigate('/login', { replace: true });
          store.dispatch({
            type: userReducerConstant.LOGOUT
          });
        });
      resolve(response);
    } else {
      reject(error.response || error);
    }
  })
);

export default ApiUtil;
