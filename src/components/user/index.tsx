import "./index.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Upload } from "antd";
import axios from "axios";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function User() {
  let { authTokens } = useAuth();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/users", {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("response", userData);
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
          <Input />
        </Form.Item>

        <Form.Item label="User Name">
          <Input />
        </Form.Item>

        <Form.Item
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
