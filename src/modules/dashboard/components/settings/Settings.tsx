import React from "react";
import { Button, Modal, Space, Typography } from "antd";
import { useAppDispatch } from "../../../../common/state/hooks";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { DashboardActions } from "../..";
import { useParams, useNavigate, Link } from "react-router-dom";

const Settings = () => {
  const { confirm } = Modal;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      <div className="dashboard-content-item">
        <Space direction="vertical">
          {/* <Link to="">
          <Typography>Upd</Typography>
        </Link> */}
          <Link to="">
            <Typography>Reset Password</Typography>
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
