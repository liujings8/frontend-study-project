import Home from './components/Home.vue';
import About from './components/About.vue';

/**
 * https://blog.csdn.net/weixin_38606332/article/details/80869586
 * https://github.com/fozero/vue-vuerouter-demo
 */
export default {
  routes: [
    {path: "/home", component: Home},
    {path: "/about", component: About},
    {path: "/", component: Home}
  ]
}
