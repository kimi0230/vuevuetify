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
  loadView,
  loadLayoutView
} from "@UTILS/other/routerLoadView.js";

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

// 多 middleware
function guards(guards) {
  return async (to, from, next) => {

    // a flag to discard remaining guards
    let changed = false;

    // handle next for multiple guards
    const mNext = function (value) {
      // prevent calling next after it is already resolved with a value
      if (changed) return;

      // if we have 'value' reslove next with the value and set changed flag 
      if (typeof value != 'undefined') {
        changed = true;
        next(value);
      }
    };

    // call guards
    for (let i = 0; i < guards.length; i++) {
      if (changed) break;
      await guards[i](to, from, mNext);
    }

    // move on if none of guards resolved next with a value
    if (!changed) next();

  }
}

const routes = [{
    path: '*', // 不存在的頁面自動導到登入頁
    redirect: '/Login'
  }, {
    path: '/login',
    name: 'loginRoot',
    component: loadLayoutView("LoginLayout"),
  }, {
    path: '/admin',
    name: 'admin',
    component: loadLayoutView("AdminLayout"),
    children: [{
      path: 'home',
      name: 'home',
      beforeEnter: checkToken,
      component: loadView("Home", "admin")
    }, {
      path: 'user',
      name: 'userList',
      beforeEnter: checkToken,
      component: loadView("User", "admin")
    }, {
      path: 'pet',
      name: 'petList',
      beforeEnter: checkToken,
      component: loadView("MyTable", "admin")
    }]
  },
  {
    path: '/test',
    name: 'test',
    component: loadLayoutView("AdminLayout"),
    children: [{
      path: 'calendar',
      name: 'calendar',
      component: loadView("Calendar", "test")
    }, {
      path: 'steps',
      name: 'steps',
      component: loadView("Steps", "test")
    }]
  }
]


const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router