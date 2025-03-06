import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { notification } from "antd";
import { NotifyContext } from "./components/notifyContext";

import AdminPage from "./pages/admin/admin_page_index.jsx";
import ClientPage from "./pages/client/client_page_index.jsx";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import UserManagement from "./pages/admin/user/userManagement.jsx";
import Profile from "./pages/admin/profile/profile.jsx";
import ProductMain from "./pages/admin/product/product-list.jsx";
import ProductCreate from "./pages/admin/product/product-create.jsx";
import ProductUpdate from "./pages/admin/product/product-update.jsx";
import OrderList from "./pages/admin/order/order-list.jsx";
import BrandList from "./pages/admin/brand/brand-list.jsx";
import Home from "./pages/client/home/home_page.jsx";
import DashboardPage from "./pages/admin/dashboard/dashboard_page.jsx";
import Contact from "./pages/client/contact/contact_page.jsx";
import About from "./pages/client/about/about_page.jsx";
import ProductDetail from "./pages/client/product-detail/product-detail_page.jsx";
import Product from "./pages/client/product/product_page.jsx";
import Feedback from "./pages/admin/feedback/feedback_page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientPage />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product-detail",
        element: <ProductDetail />,
      },
      {
        path: "404",
        element: <div>404 Not Found</div>,
      },
    ],
  },
  {
    path: "/dashboard/",
    element: <AdminPage />,
    children: [
      {
        element: <DashboardPage />,
        index: true,
      },
      {
        path: "user",
        element: <UserManagement />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "product",
        element: <ProductMain />,
      },
      {
        path: "create-product",
        element: <ProductCreate />,
      },
      {
        path: "update-product",
        element: <ProductUpdate />,
      },
      {
        path: "brand",
        element: <BrandList />,
      },
      {
        path: "order",
        element: <OrderList />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function App() {
  const [api, contextHolder] = notification.useNotification();

  const runNotification = (type, title, placement, description) => {
    api[type]({
      title,
      placement,
      description,
    });
  };

  return (
    <NotifyContext.Provider value={{ runNotification }}>
      {contextHolder}
      <RouterProvider router={router} />
    </NotifyContext.Provider>
  );
}
