<template>
  <router-view></router-view>
</template>

<script>
// export default {
//   name: "App",
//   data() {
//     return {
//       activeIndex: "/home",
//       //默认首页为home
//       openMenu: [],
//       menu: [
//         {
//           text: "首页",
//           path: "/home",
//           icon: "el-icon-s-home",
//         },
//         {
//           text: "用户管理",
//           path: "/user",
//           icon: "el-icon-user-solid",
//           submenu: [
//             {
//               text: "添加用户",
//               path: "/add",
//             },
//             {
//               text: "用户列表",
//               path: "/list",
//             },
//             {
//               text: "删除用户",
//               path: "/delete",
//             },
//             {
//               text: "修改用户",
//               path: "/edit/:id",
//             },
//             {
//               text: "用户权限",
//               path: "/power",
//             },
//           ],
//         },
//         {
//           text: "商品管理",
//           path: "/goods",
//           icon: "el-icon-grape",
//           submenu: [
//             {
//               text: "添加商品",
//               path: "/add",
//             },
//             {
//               text: "删除商品",
//               path: "/delete",
//             },
//             {
//               text: "批量删除",
//               path: "/deletemore",
//             },
//             {
//               text: "商品列表",
//               path: "/list",
//             },
//             {
//               text: "商品修改",
//               path: "/edit",
//             },
//             {
//               text: "商品搜索",
//               path: "/search",
//             },
//             {
//               text: "分类管理",
//               path: "/classification",
//               submenus: [
//                 {
//                   text: "分类列表",
//                   path: "/list",
//                 },
//                 {
//                   text: "分类添加",
//                   path: "/add",
//                 },
//                 {
//                   text: "分类删除",
//                   path: "/delete",
//                 },
//                 {
//                   text: "分类修改",
//                   path: "/edit",
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           text: "订单管理",
//           path: "/order",
//           icon: "el-icon-s-order",
//           submenu: [
//             {
//               text: "订单列表",
//               path: "/list",
//             },
//             {
//               text: "添加订单",
//               path: "/add",
//             },
//             {
//               text: "删除订单",
//               path: "/delete",
//             },
//           ],
//         },
//       ],
//     };
//   },
//   methods: {
//     active(path) {
//       this.activeIndex = path;
//     },
//   },
//   components: {},
// };
</script>

<style lang="scss">
// html {
//   height: 100%;
// }
// body {
//   margin: 0;
//   height: 100%;
// }
// .header {
//   line-height: 60px;
//   color: #fff;
//   background-color: rgba(84, 92, 100, 0.9);
//   .logo {
//     font-size: 24px;
//     color: #fc0;
//     i {
//       font-size: 40px;
//       vertical-align: middle;
//       margin-right: 5px;
//       display: inline-block;
//       width: 49px;
//       height: 49px;
//       img {
//         display: block;
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }
//     }
//   }
// }
// .is-active {
//   i {
//     color: inherit !important;
//     // inherit 继承父级颜色
//   }
// }
</style>
