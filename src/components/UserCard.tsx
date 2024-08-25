import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { GitHubUser } from "../props/users.props";

interface UserCardProps {
  user: GitHubUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: 1,
        bgcolor: "#f5f5f5",
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={user.avatar_url}
          alt={user.login}
          sx={{ width: 60, height: 60, mr: 2 }}
        />
        <div>
          <Typography variant="h6">{user.name || user.login}</Typography>
          <Typography color="textSecondary">
            {user.company || "No company"}
          </Typography>
          <Typography color="textSecondary">
            Followers: {user.followers}
          </Typography>
          <Typography color="textSecondary">
            Following: {user.following}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
