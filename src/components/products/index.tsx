import { Card } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.scss";

const { Meta } = Card;

export default function Products() {
  let { authTokens } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("tokens");
    authTokens = " ";
    window.location.reload();
  };

  const navigate = useNavigate();
  const moveToUserPage = () => {
    navigate("/user");
  };
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
                <UserOutlined onClick={moveToUserPage} />
              </Tooltip>
            </div>
          ) : (
            <Link to="/sign_in">Log In</Link>
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
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </div>
  );
}
