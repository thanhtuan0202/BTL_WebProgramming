
import HomePage from "../container/client/Homepage"
import Checkout from "../container/client/Checkout"
import Order from "../container/client/Order"
import DetailProduct from "../container/client/DetailProduct";
import Product from "../container/client/Product";
import Login from "../container/client/Login";
import Search from "../components/Search";
import Descript from "../components/Descript";
import RegisterPage from "../container/client/Register";
import ClientInfo from "../container/client/ClientInfo";
import { Fragment } from "react";

import Orders from "../container/admin/pages/Orders";
import Categories from "../container/admin/pages/Categories";
import Products from "../container/admin/pages/Products";
import Accounts from "../container/admin/pages/Accounts";
const RouteHome = [
    {
      exact: true,
      path: "/",
      component: HomePage,
      layout: "default",
    },    
    {
      exact: true,
      path: "/user",
      component: ClientInfo,
      layout: "default",
    },   
    {
      exact: false,
      path: "/product",
      component: Product,
      layout: "default",
    },
    {
      exact: false,
      path: "/checkout",
      component: Checkout,
      layout: ""
    },
    {
      exact: false,
      path: "/cart",
      component: Order,
      layout: "default",
    },
    {
      exact: false,
      path: "Product/detail/:id",
      component: DetailProduct,
      layout: "default",
    },    
    {
      exact: false,
      path: "/search",
      component: Search,
      layout: "default",
    },
    {
      exact: false,
      path: "/descript",
      component: Descript,
      layout: "default",
    },
    {
      exact: false,
      path: "/login",
      component: Login,
      layout: "",
    },
    {
      exact: false,
      path: "/register",
      component: RegisterPage,
      layout: "",
    }
  ];

  const RouteAdmin = [
    {
      exact: true,
      path: "/admin",
      component: Orders,
    },
    {
      exact: false,
      path: "/admin/categorys",
      component: Categories,
    },
    {
      exact: false,
      path: "/admin/products",
      component: Products,
    },
    // {
    //   exact: false,
    //   path: "/admin/settings",
    //   component: Settings,
    // },
    // {
    //   exact: false,
    //   path: "/admin/anothersettings",
    //   component: AnotherSettings,
    // },
    // {
    //   exact: false,
    //   path: "/admin/info",
    //   component: InfoAdmin,
    // },
    // {
    //   exact: false,
    //   path: "/admin/editCategory/:id",
    //   component: EditCategory,
    // },
    // {
    //   exact: false,
    //   path: "/admin/editFood/:id",
    //   component: UpdateFood,
    // },
    {
      exact: false,
      path: "/admin/accounts",
      component: Accounts,
    },
  ];
  export {RouteHome, RouteAdmin}