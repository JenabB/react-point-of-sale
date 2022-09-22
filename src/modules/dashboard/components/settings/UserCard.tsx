import React, { FC } from "react";
import { Card, Typography } from "antd";
import { useAppSelector } from "../../../../common/state/hooks";
import { formatDate } from "../../../../common/utils";
import { DashboardModels, DashboardSelectors } from "../../";

interface UserCardProps {
  user: DashboardModels.User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <Card>
      <Typography.Title level={4}>{user.fullName}</Typography.Title>
      <div>
        <Typography.Paragraph>
          Joined at {formatDate(user.createdAt)}
        </Typography.Paragraph>
        <Typography.Paragraph>{user.userType}</Typography.Paragraph>
        <Typography.Paragraph>{user.email}</Typography.Paragraph>
        <Typography.Paragraph>
          phone : {user.contactNumber}
        </Typography.Paragraph>
        <Typography.Paragraph>Address : {user.address}</Typography.Paragraph>
      </div>
    </Card>
  );
};

export default UserCard;
