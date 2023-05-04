import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import axios from "axios";
import { useAuth } from "../../utils/auth";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";

const onFinish = (values: any) => {
  console.log("Success:");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const { Title } = Typography;

function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const navigate = useNavigate();
  const moveToHome = () => {
    navigate("/");
  };

  async function postLogin() {
    await axios
      .post("http://localhost:8081/login", {
        username,
        password,
      })
      .then((result) => {
        const token = result.data.access_token;
        if (result.status === 200) {
          setAuthTokens(token);
          moveToHome();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <Title>Log In</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="formLogIn"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={postLogin}>
            Submit
          </Button>
        </Form.Item>
        <div className="mb-3">
          <div className="text-center">
            Do not have an account?
            <a href="/sign_up" style={{ color: "blue" }}>
              {""} Resgister now!
            </a>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
