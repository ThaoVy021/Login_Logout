import "./index.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Upload } from "antd";
import { useLocation } from "react-router";
import axios from "axios";
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
      })
      .catch((err) => console.log(err));
  }, []);

  const updateUser = () => {
    console.log("update success");
    axios
      .put(`http://localhost:8081/users/${userData.id}`, {
        userData,
      })
      .then((response) => {
        console.log(response);
        // return response.data.map((user: User) => {
        //   if (user.id === Number(tabUser)) {
        //     setUserData(user);
        //   }
        // });
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
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Name">
          <Input value={userData.name} />
        </Form.Item>

        <Form.Item label="User Name">
          <Input value={userData.username} />
        </Form.Item>

        <Form.Item
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
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
        <Form.Item label="Button">
          <Button onClick={updateUser}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
