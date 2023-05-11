import "./index.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../utils/auth";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Upload } from "antd";
import { useLocation } from "react-router";
import axios from "axios";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

export default function User() {
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

  useEffect(() => {
    axios
      .get("http://localhost:8081/users", {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      })
      .then((response) => {
        return response.data.map((user: User) => {
          if (user.id === Number(tabUser)) {
            setUserData(user);
          }
        });
        // const user = response.data.find(
        //   (user: User) => user.id === Number(tabUser)
        // );
        // setUserData({
        //   ...user,
        //   avatar: `data:image/jpeg;base64,${user.avatar}`,
        // });
      })
      .catch((err) => console.log(err));
  }, []);

  const updateUser = async (newValues: User) => {
    console.log("update success", newValues);
    await axios
      .put(
        `http://localhost:8081/user/${userData.id}`,
        {
          ...userData,
          ...newValues,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        }
      )
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
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={!componentDisabled}
        // key={userData.id}
        style={{ maxWidth: 600 }}
        // initialValues={userData}
        onFinish={(formValues) => {
          console.log(formValues);
          updateUser(formValues);
          setUserData(formValues);
          setComponentDisabled(false);
        }}
      >
        <Form.Item
          initialValue={userData.name}
          name={componentDisabled === false ? userData.name : "name"}
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          initialValue={userData.username}
          name={componentDisabled === false ? userData.username : "username"}
          label="User Name"
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
          // initialValue={userData.avatar}
          // name={userData.avatar}
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // getValueFromEvent={normFile}
        >
          <Upload
            // name={"avatar"}
            listType="picture-card"
            // onChange={(info: UploadChangeParam<UploadFile>) => {
            //   getBase64(info.file.originFileObj as RcFile, (url) => {
            //     setUserData((user) => ({ ...user, avatar: url }));
            //   });
            // }}
            // showUploadList={false}
          >
            {userData.avatar ? (
              <img src={`data:image/jpeg;base64,${userData.avatar}`} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
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
