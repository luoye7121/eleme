import Vue from 'vue';
import App from './App'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';

import 'common/stylus/index.styl'

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = true;
//把app挂在到APP根组件上
let app = Vue.extend(App);
let router = new VueRouter({
	linkActiveClass:'active'
});
//配置路由
router.map({
  '/goods': {
    component: goods
  },
  '/seller': {
  	component: seller
  },
  'ratings': {
  	component: ratings
  }
});
// 开启路有
router.start(app, '#app');
// 默认路由
// router.go('/goods');