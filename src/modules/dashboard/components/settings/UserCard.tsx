import React, { FC } from "react";
import { Card, Typography, Descriptions, Space } from "antd";
import {
  ClockCircleTwoTone,
  HomeTwoTone,
  MailTwoTone,
  PhoneTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../../../common/state/hooks";
import { formatDate } from "../../../../common/utils";
import { DashboardModels, DashboardSelectors } from "../../";

interface UserCardProps {
  user: DashboardModels.User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <>
      <Space align="center" size="large">
        <Typography.Title level={4}>{user.fullName}</Typography.Title>
        <Space align="center">
          <ClockCircleTwoTone />
          <div className="mock-block">
            <Typography.Paragraph>
              Joined at {formatDate(user.createdAt)}
            </Typography.Paragraph>
          </div>
        </Space>
      </Space>
      <div>
        <div>
          <Space align="center">
            <UserOutlined />
            <div className="mock-block">
              <Typography.Paragraph>{user.userType}</Typography.Paragraph>
            </div>
          </Space>
        </div>
        <Space size="middle">
          <div>
            <Space align="center">
              <MailTwoTone />
              <div className="mock-block">
                <Typography.Paragraph>{user.email}</Typography.Paragraph>
              </div>
            </Space>
          </div>
          <div>
            <Space align="center">
              <PhoneTwoTone />
              <div className="mock-block">
                <Typography.Paragraph>
                  {user.contactNumber}
                </Typography.Paragraph>
              </div>
            </Space>
          </div>
        </Space>
        <div>
          <Space>
            <HomeTwoTone />
            <div className="mock-block">
              <Typography.Paragraph>{user.address}</Typography.Paragraph>
            </div>
          </Space>
        </div>
      </div>
    </>
  );
};

export default UserCard;
