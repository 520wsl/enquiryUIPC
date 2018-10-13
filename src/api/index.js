import Vue from "vue";
import axios from "axios";
import iView from "iview";

Vue.use(iView);

var instance = axios.create();

instance.defaults.baseURL = "/api";
instance.defaults.timeout = 10000;
instance.defaults.headers.common["If-Modified-Since"] = "0";
instance.defaults.headers.common["Cache-Control"] = "no-cache"; // no-cache，浏览器和缓存服务器都不应该缓存页面信息

var goLogin = () => {
  location.href = "/";
};

// 各种状态码处理
var setResponse = (status, msg, url) => {
  switch (status) {
    case 500:
      console.log(
        "服务器错误500：请截图给管理员，以便快捷修复错误！  \nurl:" +
          url +
          "\n错误信息：" +
          msg
      );
      alert(
        "服务器错误500：请截图给管理员，以便快捷修复错误！  \nurl:" +
          url +
          "\n错误信息：" +
          msg
      );
      break;

    case 401:
      console.log(
        "未登录或登陆超时 401：请重新登陆！  \nurl:" +
          url +
          "\n错误信息：" +
          msg
      );
      alert(
        "未登录或登陆超时 401：请重新登陆！  \nurl:" +
          url +
          "\n错误信息：" +
          msg
      );
      goLogin();
      break;

    default:
      break;
  }
};

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    iView.LoadingBar.start();
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    iView.LoadingBar.error();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.data && response.data.status) {
      setResponse(response.data.status, response.data.msg, response.config.url);
    }
    if (response && response.data && response.data.status !== 200) {
      response.data.data = {};
    }
    iView.LoadingBar.finish();
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    console.log(String(error).search("401"));
    if (String(error).search("401") !== -1) {
      goLogin();
    }
    iView.LoadingBar.error();
    return Promise.reject(error);
  }
);

let api = {};
let likeGet = ["delete", "get", "head", "options"];
let likePost = ["post", "put", "patch"];

api.request = function() {
  let isPost = arguments[0];
  let method = arguments[1];
  let url = arguments[2];
  let data = arguments[3];
  let responseType = "json";

  let config = {
    method,
    url,
    responseType
  };

  config[isPost ? "data" : "params"] = data;

  return new Promise(function(resolve, reject) {
    instance
      .request(config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};

likeGet.forEach(method => {
  api[method] = function() {
    return api.request(false, method, ...arguments);
  };
});

likePost.forEach(method => {
  api[method] = function() {
    return api.request(true, method, ...arguments);
  };
});

export default api;
