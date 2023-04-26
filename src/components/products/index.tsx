import { Card } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import "./index.scss";

const { Meta } = Card;

export default function Products() {
  let { authTokens } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("tokens");
    authTokens = " ";
    window.location.reload();
  };
  return (
    <div>
      <div className="logInOut">
        {authTokens ? (
          <Link onClick={handleLogout} to={""}>
            {" "}
            Log Out{" "}
          </Link>
        ) : (
          <Link to="/sign_in">Log In</Link>
        )}
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
