import React, { useEffect } from "react";
import { Button, Modal, Space, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { DashboardActions, DashboardSelectors } from "../..";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserActions } from "../../action";
import UserCard from "./UserCard";

const Settings = () => {
  const { confirm } = Modal;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(DashboardSelectors.selectUserRoot);

  const { id } = useParams();

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

  useEffect(() => {
    dispatch(UserActions.getUserProfile());
  }, [dispatch]);

  return (
    <>
      <div className="dashboard-content-item">
        <UserCard user={user.data} />
        <Space direction="vertical">
          {/* <Link to="">
          <Typography>Upd</Typography>
        </Link> */}
          <Link to="/change-password">
            <Typography>Change User Password</Typography>
          </Link>
          <Button type="primary" onClick={showConfirm} danger>
            Delete Shop
          </Button>
        </Space>
      </div>
    </>
  );
};

export default Settings;
