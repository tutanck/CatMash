import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const wrap = (promise) => {
  return promise
    .then((res) => {
      console.log('api-client : res', res);
      return res.data;
    })
    .catch((err) => {
      console.error('api-client : error', err);
      throw err;
    });
};

const get = (url, options) => {
  return wrap(
    axios({
      baseURL: API_BASE_URL,
      method: 'get',
      url,
      ...options,
    })
  );
};

const post = (url, options) => {
  return wrap(
    axios({
      baseURL: API_BASE_URL,
      method: 'post',
      url,
      ...options,
    })
  );
};

const put = (url, options) => {
  return wrap(
    axios({
      baseURL: API_BASE_URL,
      method: 'put',
      url,
      ...options,
    })
  );
};

const deletion = (url, options) => {
  return wrap(
    axios({
      baseURL: API_BASE_URL,
      method: 'delete',
      url,
      ...options,
    })
  );
};

export { get, post, put, deletion };
