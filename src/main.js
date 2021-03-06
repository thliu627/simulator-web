// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import {postRequestJSON} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'
import {putRequestJSON} from './utils/api'
import {initMenu} from './utils/utils'
import {isNotNullORBlank} from './utils/utils'
import './utils/filter_utils'
import 'font-awesome/css/font-awesome.min.css'
import {Message} from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.postRequestJSON = postRequestJSON;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.putRequestJSON = putRequestJSON;
Vue.prototype.isNotNullORBlank = isNotNullORBlank;

router.beforeEach((to, from, next) => {
    // console.log(JSON.stringify(store.state.project));
    console.log(JSON.stringify(store.state.result));
    if (store.state.user.state == 'login') {
      next();
      return;
    }

    if (store.state.user.name == '未登录') {
      initMenu(router, store);
    }
    next();
  }
)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

