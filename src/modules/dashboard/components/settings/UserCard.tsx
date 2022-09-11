import React, { FC } from "react";
import { DashboardModels } from "../../";

interface UserCardProps {
  user: DashboardModels.User;
}

const UserCard: FC<UserCardProps> = (props) => {
  return <div>UserCard</div>;
};

export default UserCard;
