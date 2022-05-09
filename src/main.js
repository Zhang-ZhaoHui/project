import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios';

import {Button,Cascader,Input,Icon,Switch,Menu,Submenu, MenuItem,MenuItemGroup,Breadcrumb,
  BreadcrumbItem,Table,TableColumn,Pagination,Link,Message,Dialog,Form,FormItem,Select} from 'element-ui';

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

Vue.use(VueRouter);
Vue.use(Button);
Vue.use(Cascader);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Switch);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Menu);
Vue.use(BreadcrumbItem);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Link);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);





Message.install = function (Vue) {
  Vue.prototype.$message = Message
}
Vue.use(Message)

new Vue({
  axios,
  el:'#app',
  render: h => h(App),
  router:router,
})
