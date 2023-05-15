import React, { useEffect, useState } from "react";
import { Avatar, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useAuth } from "../../../utils/auth";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
interface DataType {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

export default function AllUsers() {
  let { authTokens } = useAuth();
  const [usersData, setUsersData] = useState<DataType[]>([
    {
      name: "",
      id: 0,
      username: "",
      avatar: "",
    },
  ]);

  const getByUser = async () =>
    await axios
      .get("http://localhost:8081/users", {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      })
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getByUser();
  }, []);

  const showUsers = usersData.map((users: DataType) => {
    return {
      id: users.id,
      name: users.name,
      username: users.username,
      avatar: users.avatar,
      key: users.id,
    };
  });

  let handleDelete = (key: number) => {
    const newUsers = async () =>
      await axios
        .delete(`http://localhost:8081/user/${key}`, {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        })
        .then((response) => {
          const newData = showUsers.filter((item) => item.id !== key);
          setUsersData(newData);
        })
        .catch((err) => console.log(err));

    newUsers();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render(value, record) {
        return <Link to={`/user/${record.id}`}>{value}</Link>;
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "20%",
      render(value) {
        return (
          <img
            src={value}
            style={{ width: "50px", height: "auto", borderRadius: "100%" }}
          />
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "x",
      width: "20%",
      render: (row, record) => (
        <Space size="middle" className="cursor-pointer">
          <Popconfirm
            title="Sure to delete?"
            okText="Yes"
            cancelText="No"
            className="popconfirm"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={showUsers}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 240 }}
      style={{ margin: "20px" }}
    />
  );
}
