const Main = r =>
  require.ensure([], () => r(require("@/components/main")), "tpl");

// 首页
const home = r =>
  require.ensure([], () => r(require("@/views/home/index")), "home");

// 询盘列表
const enquiry = r =>
  require.ensure([], () => r(require("@/views/enquiry/index")), "enquiry");
// 询盘列表
const enquiry_info = r =>
  require.ensure([], () => r(require("@/views/enquiry/info")), "enquiry");

// 询盘列表
const log = r =>
  require.ensure([], () => r(require("@/views/log/index")), "log");
// 询盘列表
const log_info = r =>
  require.ensure([], () => r(require("@/views/log/info")), "log");

/**
 * 项目中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: "/",
    name: "_home",
    redirect: "/home",
    component: Main,
    children: [
      {
        path: "/home",
        name: "home",
        component: home,
        meta: {
          title: "首页"
        }
      }
    ]
  },
  {
    path: "/enquiry",
    component: Main,
    children: [
      {
        path: "index",
        name: "enquiry",
        component: enquiry,
        meta: {
          title: "询盘列表"
        }
      },
      {
        path: "info",
        name: "enquiry_info",
        component: enquiry_info,
        meta: {
          title: "询盘详情"
        }
      }
    ]
  },
  {
    path: "/log",
    component: Main,
    children: [
      {
        path: "index",
        name: "log",
        component: log,
        meta: {
          title: "消息列表"
        }
      },
      {
        path: "info",
        name: "log_info",
        component: log_info,
        meta: {
          title: "消息详情"
        }
      }
    ]
  }
];
