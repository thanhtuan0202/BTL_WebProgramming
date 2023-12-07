import React, { useState, useEffect } from "react";
import axios from "axios";
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
export default function InfoAdmin() {
  const [info, setInfo] = useState({
    id: 1,
    username: "",
    fullname: "",
    email: null,
    phone: null,
    dob: "2002-09-11",
    gender: "F",
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("admin");

  const loadnewInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost/assignment/backend/index.php/users`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInfo(res.data.data.user_info);
    } catch (error) {
      console.log("fail to get info", error.message);
    }
  };
  useEffect(() => {
    loadnewInfo();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost/assignment/backend/index.php/users",info,{
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
          Admin Infomation
        </Typography>
        <div>
          <form>
          <TextField
              type="text"
              name="username"
              label="Username"
              value={info.username}
              onChange={handleInputChange}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="fullname"
              label="Full Name"
              value={info.fullname || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="email"
              label="Email"
              value={info.email || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="phone"
              label="Phone"
              value={info.phone || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="dob"
              label="Date of Birth"
              value={info.dob}
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
}
