import React, { useState } from "react";
import { Button, Form, Input, Typography, Upload } from "antd";

import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import { useAuth } from "../../utils/auth";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const { Title } = Typography;

function SignUp() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const avatar = fileList[0] ? fileList[0].thumbUrl?.slice(22) : undefined;

  async function submitSignup() {
    await axios
      .post("http://localhost:8081/user/register", {
        name,
        username,
        password,
        avatar,
      })
      .then((res) => {
        console.log(res);
        // if (res.data.success === true) {
        //   localStorage.token = res.data.token;
        //   localStorage.isAuthenticated = true;
        //   window.location.reload();
        // }
      });
    // .catch((err) => {
    //   console.log("Sign up data submit error: ", err);
    // });
  }

  return (
    <div>
      <Title>Resgister</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "0 auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="m-auto w-fit formLogin"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Avatar"
          name="avatar"
          rules={[{ required: true, message: "Please input your avatar!" }]}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            beforeUpload={() => false}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>

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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={submitSignup}
            className="w-full text-base font-medium justify-center hover:bg-transparent"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <div className="mb-3">
        <div className="text-center">
          Already have an account?
          <a href="/sign_in" style={{ color: "blue" }}>
            {""} Sign in now!
          </a>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
