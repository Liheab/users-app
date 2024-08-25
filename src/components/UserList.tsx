import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { GitHubUser } from "../props/users.props";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<GitHubUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const usersPerPage = 9;
  const token = "Github_token"; // details in readme.md

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://api.github.com/users");
      const data = await response.json();

      const userDetails = await Promise.all(
        data.slice(0, 25).map(async (user: GitHubUser) => {
          const userResponse = await fetch(
            `https://api.github.com/users/${user.login}`,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          );
          return userResponse.json();
        })
      );

      setUsers(userDetails);
      setFilteredUsers(userDetails);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        searchTerm.toLowerCase() === "" ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <Container>
      <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={2}>
          <Typography variant="h5">GitHub Users</Typography>
        </Grid>
        <Grid item xs={10} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Search by name or company"
            variant="outlined"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {displayedUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.login}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * usersPerPage >= filteredUsers.length}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserList;
