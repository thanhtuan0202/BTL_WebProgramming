import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  InputAdornment,
  Input,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const UserProfilePage = () => {
  const [userData, setUserData] = useState({
    id: 10,
    username: "username12",
    fullname: "Thanh Tuan Nguyen",
    email: null,
    phone: null,
    dob: "2002-09-11",
    gender: "F",
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Fetch user data from an API endpoint (replace with your actual endpoint)
    axios
      .get("http://localhost/assignment/backend/index.php/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data.data.user_info); // Update user data in state with fetched data
        console.log("user: ",userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = () => {
    console.log(userData);
    axios
      .put("http://localhost/assignment/backend/index.php/users",userData,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("data: " + response.data);
        setIsEditing(false);

      })
      .catch((error) => {
        console.error("Error updating user data:", error.data);
        // Handle error scenarios accordingly
        alert(error.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          User Profile
        </Typography>
        <div>
          <div>
            img
          </div>
          <form>
            <TextField
              type="text"
              name="id"
              label="ID"
              value={userData.id}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="username"
              label="Username"
              value={userData.username}
              onChange={handleInputChange}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="fullname"
              label="Full Name"
              value={userData.fullname}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="email"
              label="Email"
              value={userData.email || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="phone"
              label="Phone"
              value={userData.phone || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="dob"
              label="Date of Birth"
              value={userData.dob}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="gender"
              label="Gender"
              value={userData.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              {isEditing ? (
                <div>
                  <Button variant="contained" onClick={handleUpdate}>
                    Lưu thay đổi
                  </Button>
                  <Button variant="contained" onClick={handleEditToggle}>
                    Huỷ bỏ
                  </Button>
                </div>
              ) : (
                <Button variant="contained" onClick={handleEditToggle}>
                  Chỉnh sửa
                </Button>
              )}
            </Box>
          </form>
        </div>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
