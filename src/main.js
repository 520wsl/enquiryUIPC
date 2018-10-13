import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";

import api from "./api";
import utils from "./utils";

import "iview/dist/styles/iview.css";

Vue.use(iView);

/** axios 全局注册 */
Vue.prototype.$get = api.get;
Vue.prototype.$post = api.post;
Vue.prototype.queryPC = api;

/** 工具类方法全局注册 */
Vue.prototype.utils = utils;
Vue.prototype.session = utils.session;
Vue.prototype.cookie = utils.cookie;
Vue.prototype.storeage = utils.storeage;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
