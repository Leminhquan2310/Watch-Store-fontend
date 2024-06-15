import { Button, Checkbox, Form, Input, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values) => {
    axios
      .post("http://localhost:3000/api/v1/user/login", values)
      .then((result) => {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        navigate("/dashboard");
      })
      .catch(() => {
        openNotification();
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const openNotification = () => {
    api.error({
      message: "Sign In Failed",
      description: "Wrong username or password!",
      placement: "top",
    });
  };

  return (
    <div className="form-page">
      <h1>Sign In</h1>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          width: "20%",
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
