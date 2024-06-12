import { Layout } from "antd";
import Logo from "../components/logo";
import MenuList from "../layouts/MenuList";
import ToggleThemeButton from "../components/toggleThemeButton";
import Contents from "./contents";
import { useState } from "react";

const { Sider, Content } = Layout;

const contentStyle = {
  minHeight: 120,
  color: "#000",
  padding: "10px",
};

function Dashboard() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <Layout>
      <Sider
        collapsed={false}
        theme={darkTheme ? "dark" : "light"}
        className="sidebar"
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton toggleTheme={toggleTheme} darkTheme={darkTheme} />
      </Sider>
      <Content style={contentStyle}>
        <Contents />
      </Content>
    </Layout>
  );
}

export default Dashboard;
