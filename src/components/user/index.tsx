import "./index.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth";
import { Button, Checkbox, Form, Input, Upload } from "antd";
import { useLocation } from "react-router";
import axios from "axios";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

export default function User() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  let { authTokens } = useAuth();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    username: "",
    avatar: "",
  });
  const location = useLocation();
  const tabUser = location.pathname.split("r/").pop();

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

  useEffect(() => {
    axios
      .get("http://localhost:8081/users", {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      })
      .then((response) => {
        const user = response.data.find(
          (user: User) => user.id === Number(tabUser)
        );
        setFileList([
          {
            uid: user.id,
            name: `${user.name}.png`,
            url: user.avatar,
          },
        ]);
        form.setFieldsValue(user);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateUser = async (newValues: User) => {
    console.log("update success", newValues);
    await axios
      .put(`http://localhost:8081/user/${newValues.id}`, newValues, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="userPage">
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Edit
      </Checkbox>

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={!componentDisabled}
        style={{ maxWidth: 600 }}
        initialValues={userData}
        onFinish={(formValues) => {
          updateUser(formValues);
          setComponentDisabled(false);
        }}
      >
        <Form.Item name="id" label="Id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="username"
          label="User Name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Avatar"
          name="avatar"
          rules={[
            {
              required: true,
              message: "Please input your avatar!",
            },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList?.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "50px",
          }}
        >
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
