import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'

const requestConfig = {
    "sso-service": {
      "contextName": "sso-service",
      "contentType": "application/x-www-form-urlencoded",
      "URIEncode": true
    },
    "sharding-service": {
      "contextName": "sharding-service",
      "contentType": "application/json",
      "URIEncode": false
    },
    "escrow-manage": {
      "contextName": "escrow-manage",
      "contentType": "application/x-www-form-urlencoded",
      "URIEncode": false
    },
}
const baseUrl = window.location.protocol + "//" +  window.location.host;
// const baseUrl = '';

axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
});
/**
 * 000000 成功
 * 000001 权限不足
 *  http://192.168.4.69:8080/oms/storage.html
 */
axios.interceptors.response.use(resp=> {
  if (resp.status && resp.status == 200) {
    if (resp.data.code == '000000') {
      return resp.data;
    }
    if (resp.data.code == '000001') {
      getRequest("sso-service", '/user/getLoginUrl?timeStamp='+new Date().getTime()).then(resp => {
        let data = resp.data;
        let targetUrl = data.redirectUrl;
        let currentUrl = window.location.href.substring(0, window.location.href.length - 1);
        window.location.href = targetUrl + "?redirectUrl="+encodeURIComponent(currentUrl);
      });
    } else {
      Message.error({message: resp.data.msg});
      return resp.data;
    }
  }
  return;
}, err=> {
  if (err.response == undefined) {
    Message.error({message: '未知错误!'});
  } else if (err.response.status == 504||err.response.status == 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status == 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  } else if (err.response.status == 401) {
    // router.currentRoute.path !== 'Login' &&
    // router.replace({
    //   path: '/',
    // })
  } else {
    Message.error({message: '未知错误!'});
  }
  return Promise.resolve(err);
})

let base = "";
export const postRequest = (application, url, params) => {
  return axios({
    method: 'post',
    baseURL: baseUrl,
    url: `${requestConfig[application].contextName}${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      if (`${requestConfig[application].URIEncode}` == "true") {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      } else {
        return data
      }
    }],
    headers: {
      'Content-Type': `${requestConfig[application].contentType}`,
      'Authentication': window.localStorage.getItem('accessToken')
    }
  });
}
export const postRequestJSON = (application, url, params) => {
  return axios({
    method: 'post',
    baseURL: baseUrl,
    url: `${requestConfig[application].contextName}${base}${url}`,
    data: params,
    headers: {
      'Content-Type': `application/json`,
      'Authentication': window.localStorage.getItem('accessToken')
    }
  });
}
export const uploadFileRequest = (application, url, params) => {
  return axios({
    method: 'post',
    baseURL: baseUrl,
    url: `${requestConfig[application].contextName}${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authentication': window.localStorage.getItem('accessToken')
    }
  });
}
export const putRequest = (application, url, params) => {
  return axios({
    method: 'put',
    baseURL: baseUrl,
    url: `${requestConfig[application].contextName}${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      if (`${requestConfig[application].URIEncode}` == "true") {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      } else {
        return data
      }
    }],
    headers: {
      'Content-Type': `${requestConfig[application].contentType}`,
      'Authentication': window.localStorage.getItem('accessToken')
    }
  });
}
export const putRequestJSON = (application, url, params) => {
  return axios({
    method: 'put',
    baseURL: baseUrl,
    url: `${requestConfig[application].contextName}${base}${url}`,
    data: params,
    headers: {
      'Content-Type': `application/json`,
      'Authentication': window.localStorage.getItem('accessToken')
    }
  });
}
export const deleteRequest = (application, url) => {
  return axios({
    method: 'delete',
    baseURL: baseUrl,
    url: `${requestConfig[application].contextName}${base}${url}`,
    headers: {
      'Authentication': window.localStorage.getItem('accessToken')
    }
  });
}
export const getRequest = (application, url) => {
  return axios({
    method: 'get',
    baseURL: baseUrl,
    url: `${requestConfig[application].contextName}${base}${url}`,
    headers: {
      'Authentication': window.localStorage.getItem('accessToken')
    }
  });
}
