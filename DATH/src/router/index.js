
import HomePage from "../container/client/Homepage"
import Checkout from "../container/client/Checkout"
import Order from "../container/client/Order"
import DetailProduct from "../container/client/DetailProduct";
import Product from "../container/client/Product";
import Login from "../container/client/Login";
import Search from "../components/Search";
import Descript from "../components/Descript";
import AdminHomePage from "../container/admin";
import DanhSachPage from "../container/admin/Page/DanhSachDonHang";
const RouteHome = [
    {
      exact: true,
      path: "/",
      component: HomePage,
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

  ];

  const RouteAdmin = [
    {
      exact: false,
      path: "/admin",
      component: AdminHomePage,
      layout: "default",
    },    
    {
      exact: true,
      path: "/admin/login",
      component: Login,
      layout: "",
    },
    {
      exact: false,
      path: "admin/danh-sach",
      component: DanhSachPage,
      layout: "default",
    }, 
  ];
  export {RouteHome, RouteAdmin}