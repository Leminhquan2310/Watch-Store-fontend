import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";

function ToggleThemeButton({ darkTheme, toggleTheme }) {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme}>
        {darkTheme ? <MoonOutlined /> : <SunOutlined />}
      </Button>
    </div>
  );
}

export default ToggleThemeButton;
