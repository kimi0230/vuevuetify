import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLayout from '@/layout/AdminLayout.vue'
import LoginLayout from '@/layout/LoginLayout.vue'
import Home from '@/views/admin/Home.vue'
import MyTable from '@/views/admin/MyTable.vue'
import User from '@/views/admin/User.vue'
import Calendar from '@/views/test/Calendar.vue'
import Steps from '@/views/test/Steps.vue'
import moment from "moment";

import {
  getStorage
}
from '@/utils/localstorage'

Vue.use(VueRouter)


//判別是否有權限
let getToken = routerName => {
  const userInfo = getStorage("localUserInfo")
  if (userInfo) {
    const expirationDate = userInfo.expirationDate;
    console.log("expirationDate", expirationDate);
    const nowDateUTC = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    // token過期
    if (expirationDate < nowDateUTC) {
      return false;
    }
  }

  return userInfo.token;
};

//判別是否有權限
let checkPermission = routerName => {
  // const userPermission = getStorage("localUserPermission");
  // console.log("userPermission", userPermission);
  // let id = userPermission["allowURL"] ? userPermission["allowURL"][routerName] : "";
  // console.log("id", id);
  // return userPermission.allowID.includes(id);
  return true
};

// 中間層檢查token 判別權限
let checkToken = (to, from, next) => {
  let token = getToken();
  let permission = checkPermission(to.path);
  switch (to.name) {
    case "login":
      token && next("/");
      token || next();
      break;
      // case "home":
      //   token && next();
      //   token || next("/login");
      //   break;
    default:
      if (token && permission) {
        next();
      } else if (token && !permission) {
        console.error("routerCheck error: 該頁尚無權限，請確認")
        next("/");
      } else {
        next("/login");
      }
  }
};


const routes = [{
    path: '*', // 不存在的頁面自動導到登入頁
    redirect: '/Login'
  }, {
    path: '/login',
    name: 'loginRoot',
    component: LoginLayout,
  }, {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    children: [{
      path: 'home',
      name: 'home',
      beforeEnter: checkToken,
      component: Home
    }, {
      path: 'user',
      name: 'userList',
      beforeEnter: checkToken,
      component: User
    }, {
      path: 'pet',
      name: 'petList',
      beforeEnter: checkToken,
      component: MyTable
    }]
  },
  {
    path: '/test',
    name: 'test',
    component: AdminLayout,
    children: [{
      path: 'calendar',
      name: 'calendar',
      component: Calendar
    }, {
      path: 'steps',
      name: 'steps',
      component: Steps
    }]
  }
]


const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router