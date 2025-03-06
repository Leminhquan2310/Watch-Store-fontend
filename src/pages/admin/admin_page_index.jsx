import { useContext } from "react";
import {
  BellFilled,
  BranchesOutlined,
  CaretDownOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MessageOutlined,
  OrderedListOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { NotifyContext } from "../../components/notifyContext";
import { logout } from "../../service/authService";
import "./admin_page_index.css";
import { Header } from "antd/es/layout/layout";
import Avatar from "../../components/avatar";
const { Footer, Sider } = Layout;
const { Search } = Input;

const itemsMenuList = [
  {
    key: "grp1",
    label: "Menu",
    type: "group",
  },
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "/dashboard/user",
    label: "User",
    icon: <UserOutlined />,
  },
  {
    key: "/dashboard/product",
    label: "Product",
    icon: <ProductOutlined />,
  },
  {
    key: "/dashboard/brand",
    label: "Brand",
    icon: <BranchesOutlined />,
  },
  {
    key: "/dashboard/order",
    label: "Order",
    icon: <OrderedListOutlined />,
  },
  {
    key: "/dashboard/feedback",
    label: "Feedback",
    icon: <MessageOutlined />,
  },
  {
    key: "grp2",
    label: "Setting",
    type: "group",
  },
  {
    key: "information",
    label: "Information",
    icon: <InfoCircleOutlined />,
  },
  {
    key: "logout",
    label: "LogOut",
    icon: <LogoutOutlined />,
    danger: true,
  },
];

const AdminPage = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { runNotification } = useContext(NotifyContext);

  const handleChangePage = (e) => {
    if (e.key === "logout") {
      const fetchLogout = async () => {
        try {
          await logout();
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
          navigate("/login");
        } catch (error) {
          runNotification(
            "warning",
            "LOGOUT",
            "top",
            "The request cannot be fulfilled!"
          );
        }
      };

      fetchLogout();
    }

    navigate(e.key);
  };
  return (
    <Layout className="container">
      <Header className="header">
        <div className="logo">
          <div className="logo_icon">W</div>
          <p className="logo_name">WATCHSTORE</p>
        </div>
        <div className="search_tab">
          <div className="search_tag">
            <Search
              className="btn_search"
              placeholder="Search"
              // onSearch={onSearch}
            />
          </div>
        </div>
        <div className="profile">
          <div className="avatar">
            <Avatar circle />
          </div>
          <div className="name">
            Minhquan
            <CaretDownOutlined className="icon-dropdown" />
          </div>
          <div className="icon_bell">
            <BellFilled />
          </div>
        </div>
      </Header>
      <Layout className="body">
        <Sider className="sider">
          <Menu
            className="menu"
            onClick={handleChangePage}
            items={itemsMenuList}
          />
        </Sider>
        <Layout className="content">
          <div className="content_body">
            <Outlet />
          </div>
          <Footer>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AdminPage;
