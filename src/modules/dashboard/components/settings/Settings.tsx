import { Button, Modal, Space, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { DashboardActions, DashboardSelectors } from "../..";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserCard from "./UserCard";

const Settings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(DashboardSelectors.selectUserRoot);

  const { id } = useParams();
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete this shop?",
      icon: <ExclamationCircleOutlined />,
      content: "You aren't able to revert this",
      onOk() {
        dispatch(DashboardActions.deleteShop({ shopId: id }));
        navigate("/shop");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div className="dashboard-content-item">
        <UserCard user={user.data} />
        <div style={{ marginTop: "20px" }}>
          <Space size="large">
            <Link to="/change-information">
              <Button type="primary">Change User Information</Button>
            </Link>
            <Link to="/change-password">
              <Button>Change User Password</Button>
            </Link>
            <Button type="text" onClick={showConfirm} danger>
              Delete Shop
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
};

export default Settings;
