import Vue from 'vue'
import App from './App.vue'
/*注册filters.js 里面的方法为全局filter*/
// import filters from './assets/filters.js';
// Object.keys(filters).forEach(k => {Vue.filter(k, filters[k])});

new Vue({
  el: '#app',
  render: h => h(App)
})
