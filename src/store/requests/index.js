import axios from 'axios';
import { URLs } from './configuration';
import { URL, isNewBackend, APIVersion, isJWTAuthentication } from '../../app-config';

const Demo = () => {
  var token = {
    access_token:
      'bssssciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJc3N1ZXIiOiJub0ZldmVyIiwidW5pcXVlX25hbWUiOiIzYmRlMjE1OC03N2I0LTQzMzMtOGVhMC03NGI2NTJhNjU1ZTYiLCJVc2VySWQiOiIzYmRlMjE1OC03N2I0LTQzMzMtOGVhMC03NGI2NTJhNjU1ZTYiLCJEZXZpY2VJZCI6IiIsIlRpbWUiOiIyLzE3LzIwMjEgNDo1ODoyOCBBTSIsIm5iZiI6MTYxMzUzNzkwOCwiZXhwIjoxNjQ1MDczOTA4LCJpYXQiOjE2MTM1Mzc5MDh9.zYWO4Is7i5pU4cyGNr-myzTLqFQsC7hn2MnRbc1Ik0w',
    created: Date.now(),
  };
  localStorage.setItem('cube:token', JSON.stringify(token));

  const accessToken = JSON.parse(localStorage.getItem('cube:token')).access_token;
  axios.defaults.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
};

//Demo();

if (isNewBackend) {
  axios.defaults.baseURL = URL + APIVersion;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Decoder'] = 'Pascal';
} else {
  axios.defaults.baseURL = URL;
  axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
}

const onRequestSuccess = config => {
  console.debug('request success', config);
  var tokenObject = localStorage.getItem('cube:token');
  if (tokenObject && isNewBackend) {
    const accessToken = JSON.parse(localStorage.getItem('cube:token')).access_token;
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  }
  return config;
};

const onRequestFail = error => {
  console.debug('request error', error);
  return Promise.reject(error);
};

axios.interceptors.request.use(onRequestSuccess, onRequestFail);

const onResponseSuccess = response => {
  console.debug('response success', response);
  return response;
};
const onResponseFail = error => {
  console.debug('response error', error);
  return Promise.reject(error);
};

axios.interceptors.response.use(onResponseSuccess, onResponseFail);

export default class API {
  static login = param => {
    if (isJWTAuthentication) {
      return axios.post(URL + APIVersion + 'Registration/VerifyAdminUser', param);
    }

    const defaultOptions = {
      baseURL: URL,
      timeout: 36000,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    let instance = axios.create(defaultOptions);
    //var loginData = `?username=` + param.username + `&password=` + param.password + `&grant_type=` + param.grant_type;
    var formBody = [];
    for (var property in param) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(param[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.debug(formBody);
    if (isNewBackend) {
      return instance.post('connect/token', formBody);
    } else {
      return instance.post('controllers/portal/authenticate', formBody);
    }
  };

  static refreshToken = param => {
    const defaultOptions = {
      baseURL: URL,
      timeout: 36000,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    let instance = axios.create(defaultOptions);
    var formBody = [];
    for (var property in param) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(param[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.debug(formBody);
    if (isNewBackend) {
      return instance.post('connect/token', formBody);
    } else {
      return instance.post('controllers/portal/login', formBody);
    }
  };

  static recoverPassword = param => {
    const defaultOptions = {
      baseURL: URL,
      timeout: 36000,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    let instance = axios.create(defaultOptions);
    var formBody = [];
    delete param.identifier;
    for (var property in param) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(param[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.debug(formBody);
    if (isNewBackend) {
      return instance.post('connect/token', formBody);
    } else {
      return instance.post('controllers/portal/resetpassword', formBody);
    }
  };

  static getURL = (url, action) => {
    let masterConfig = JSON.parse(localStorage.entityMapping);
    if (masterConfig[url]) {
      return 'cube/' + url + '/' + action;
    } else {
      return url + '/' + action;
    }
  };

  static triggerPost = (url, param) => {
    if (isNewBackend) {
      var action = param.action;
      delete param.action;
      delete param.apiIdentifier;
      if (param.sortInfo) {
        var sortInfo = [];
        for (var item of param.sortInfo) {
          sortInfo.push({
            sortBy: item.sort,
            sortDirection: item.dir,
          });
        }
        param.sortInfo = sortInfo;
      }
      param.accessToken = JSON.parse(localStorage.getItem('cube:token')).access_token;
      return axios.post(API.getURL(url, action), param);
      //return axios.post('cube/Maiden Cube/System/Core System/' + url + '/' + action, param);
    } else {
      const accessToken = JSON.parse(localStorage.getItem('cube:token')).access_token;
      var apiIdentifier = param.apiIdentifier;
      delete param.apiIdentifier;
      url = 'controllers/portal/' + url;
      delete param.controller;
      var formBody = [];

      const filter = param.filter || [];
      for (var index = 0; index < filter.length; index++) {
        var filterItem = filter[index];
        var field = filterItem.field;
        var data = filterItem.data;
        formBody.push('filter[' + index + '][field]' + '=' + field);
        formBody.push('filter[' + index + '][data][type]' + '=' + data.type);
        // To Do: Need to handle other filters
        if (data.type == 'list') {
          for (var arrayItem of data.value.split(',')) {
            formBody.push('filter[' + index + '][data][value]' + '=' + arrayItem);
          }
        } else if (data.type == 'boolean' || data.type == 'string' || data.type == 'int') {
          formBody.push('filter[' + index + '][data][value]' + '=' + data.value);
        } else if (data.type == 'date' || data.type == 'numeric') {
          formBody.push('filter[' + index + '][data][value]' + '=' + data.value);
          var comparison = '';
          if (data.comparison == 'gt') {
            comparison = 'gt';
          } else if (data.comparison == 'lt') {
            comparison = 'lt';
          } else if (data.comparison == 'eq') {
            comparison = 'eq';
          }
          formBody.push('filter[' + index + '][data][comparison]' + '=' + comparison);
        }
      }
      delete param.filter;

      const sortInfo = param.sortInfo;
      if (sortInfo && sortInfo.length > 0) {
        formBody.push('sort=' + sortInfo[0].sort);
        formBody.push('dir=' + (sortInfo[0].dir == 'desc' ? 'DESC' : 'ASC'));
      }

      delete param.sortInfo;

      for (var property in param) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(param[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody.push('accessToken=' + accessToken);
      formBody = formBody.join('&');

      return axios.post(url, formBody);
    }
  };

  static triggerMultiPartPost = (url, param, files) => {
    if (isNewBackend) {
      var action = param.action;
      delete param.action;
      delete param.apiIdentifier;
      //return axios.post(url + '/' + action, param);

      const formData = new FormData();
      for (var property in param) {
        formData.append(property, param[property]);
      }

      if (files) {
        for (var file of files) {
          formData.append('ImageInfo', file);
        }
      }

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      return axios.post(API.getURL(url, 'MultiPart' + action), formData, config);
    } else {
      const accessToken = JSON.parse(localStorage.getItem('cube:token')).access_token;
      delete param.apiIdentifier;
      url = 'controllers/portal/' + url;
      delete param.controller;

      delete param.filter;
      delete param.sortInfo;

      const formData = new FormData();
      for (var property in param) {
        formData.append(property, param[property]);
      }
      formData.append('accessToken', accessToken);
      if (files) {
        for (var file of files) {
          formData.append('file', file);
        }
      }

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      return axios.post(url, formData, config);
    }
  };

  static autoFill = param => {
    if (isNewBackend) {
      // To Do: Need to handle
      var url = 'controllers/portal/combo';
      return axios.post(url, param);
    } else {
      const accessToken = JSON.parse(localStorage.getItem('cube:token')).access_token;
      var identifier = param.identifier;
      delete param.identifier;
      var url = 'controllers/portal/' + identifier;
      var formBody = [];
      for (var property in param) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(param[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody.push('accessToken=' + accessToken);
      formBody = formBody.join('&');

      return axios.post(url, formBody);
    }
  };

  static listAssets = param => {
    return axios.post(URLs.listAssets, param);
  };

  static listAssetsRequest = (param, onSucess, onFailure) => {
    return axios
      .post(URLs.listAssets, param)
      .then(onSucess)
      .catch(onFailure);
  };
}
