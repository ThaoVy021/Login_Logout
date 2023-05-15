import { useEffect, useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { UsergroupDeleteOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import "./index.scss";
import { useLocation } from "react-router";

const { Meta } = Card;

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

export default function Products(props: User) {
  let { authTokens } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("tokens");
    authTokens = " ";
    window.location.reload();
  };

  const [userData, setUserData] = useState({ name: "", id: 0 });

  const navigate = useNavigate();
  const moveToUserPage = () => {
    navigate("/user/" + userData.id);
  };
  const moveToAllUsersPage = () => {
    navigate("/all_users");
  };

  const location = useLocation();
  const tabUser = location.pathname.split("e/").pop();

  useEffect(() => {
    const getByUser = async () =>
      await axios
        .get("http://localhost:8081/users", {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        })
        .then((response) => {
          return response.data.map((user: User) => {
            if (user.username === tabUser) {
              setUserData(user);
            }
          });
        })
        .catch((err) => console.log(err));

    getByUser();
  }, []);

  return (
    <div>
      <div className="flex justify-end header">
        <div className="logInOut">
          {authTokens ? (
            <div>
              <Link
                style={{ marginRight: "20px" }}
                onClick={handleLogout}
                to={""}
              >
                {" "}
                Log Out{" "}
              </Link>
              <Tooltip title="User Detail">
                <UserOutlined
                  onClick={moveToUserPage}
                  style={{ marginRight: "20px" }}
                />
              </Tooltip>
              <Tooltip title="All Users">
                <UsergroupDeleteOutlined onClick={moveToAllUsersPage} />
              </Tooltip>
            </div>
          ) : (
            <Link to="/sign_in" style={{ marginRight: "20px" }}>
              Log In
            </Link>
          )}
        </div>
      </div>

      <Card
        hoverable
        style={{ width: 240, margin: "0 auto" }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta
          title={`Hello ${userData.name}`}
          description="www.instagram.com"
        />
      </Card>
    </div>
  );
}
