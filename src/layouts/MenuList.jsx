/* eslint-disable react/prop-types */
import {
  DashboardOutlined,
  MailOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "/",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "sub1",
    label: "Pagination",
    icon: <MailOutlined />,
    children: [
      {
        key: "/dashboard/user",
        label: "User",
        icon: <UnorderedListOutlined />,
      },
      {
        key: "/dashboard/profile",
        label: "Profile",
        icon: <UserOutlined />,
      },
      {
        key: "3",
        label: "Option 3",
      },
      {
        key: "4",
        label: "Option 4",
      },
    ],
  },
  {
    key: "13",
    label: "Option 13",
  },
  {
    key: "14",
    label: "Option 14",
  },
];

function MenuList({ darkTheme }) {
  const navigate = useNavigate();
  const handleChangePage = (e) => {
    navigate(e.key);
  };
  return (
    <Menu
      className="menu-bar"
      theme={darkTheme ? "dark" : "light"}
      onClick={handleChangePage}
      mode="inline"
      items={items}
    />
  );
}

export default MenuList;
