import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router-config.js'
import App from './App.vue';

Vue.use(VueRouter);

//create router
const router = new VueRouter(routerConfig);

new Vue({
  el: '#app',    //这里绑定的是index.html中的id为app的div元素
  router,
  render: h => h(App)
})

