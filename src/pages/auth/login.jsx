import { Button, Checkbox, Form, Input } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotifyContext } from "../../components/notifyContext";
import { login } from "../../service/authService";

const App = () => {
  const navigate = useNavigate();
  const { runNotification } = useContext(NotifyContext);

  const onFinish = (values) => {
    const fetchCallLogin = async () => {
      try {
        const result = await login(values);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        if (result.role === "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        runNotification(
          "error",
          "Sign In Failed",
          "top",
          "Wrong username or password!"
        );
      }
    };
    fetchCallLogin();
  };

  const onFinishFailed = () => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <div className="form-page">
      <h1>Sign In</h1>
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          width: "30%",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
          <Button type="link" onClick={() => navigate("/register")}>
            Create a new account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;
