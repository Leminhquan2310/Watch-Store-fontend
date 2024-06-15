import { Button, Form, Input, Spin } from "antd";
import { register } from "../service/userServicePublic";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const Register = () => {
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setSpinning(true);
    const { name, email, username, password, phoneNumber } = { ...values };
    const fetchCreateUser = async () => {
      await register({
        name,
        email,
        username,
        password,
        phoneNumber,
      });
    };
    setTimeout(() => {
      fetchCreateUser();
      navigate("/login");
      setSpinning(false);
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="form-page">
      <h1>Sign up</h1>
      <Spin
        spinning={spinning}
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        fullscreen
      />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
            {
              min: 5,
              message: "Name must be than5 characters!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              pattern: /\S+@\S+\.\S+/,
              message: "Email Invalid!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              pattern: /^(0|\+84)(\d{9})$/,
              message: "Phone number Invalid!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              min: 5,
              message: "Username must be than 5 characters!",
            },
            {
              pattern: /^\S*$/,
              message: "Usernmae connot contain spaces!",
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
            {
              validator: (_, value) => {
                if (value && value.length <= 5) {
                  return Promise.reject(
                    new Error("Password must be at least 5 characters long!")
                  );
                }
                if (value && /\s/.test(value)) {
                  return Promise.reject(
                    new Error("Password cannot contain spaces!")
                  );
                }
                if (value && !/[A-Z]/.test(value)) {
                  return Promise.reject(
                    new Error("Password must be have at least one uppercase")
                  );
                }
                if (value && !/[a-z]/.test(value)) {
                  return Promise.reject(
                    new Error("Password must be have at least one lowercase")
                  );
                }
                if (value && !/[0-9]/.test(value)) {
                  return Promise.reject(
                    new Error("Password must be have at least one number")
                  );
                }
                if (value && !/[!@#$%^&*]/.test(value)) {
                  return Promise.reject(
                    new Error(
                      "Password must be have at least one special character!"
                    )
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
          <Button
            onClick={() => navigate("/login")}
            style={{
              margin: "0 10px",
            }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
