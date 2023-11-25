import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullname: '',
    phone: '',
    dob: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/assignment/backend/index.php/auth/register', formData);
      console.log(response.data); // Handle success response as needed
      // Optionally, you can redirect the user to a different page after successful registration
      alert("Đăng ký thành công!");
      navigate('/login');
        
    } catch (err) {
      setError('Registration failed. Please try again.'); // Handle registration failure
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h2" align="center">
          Register
        </Typography>
        {error && (
          <Typography variant="body1" color="error" align="center" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 3 }}>
          <TextField
            type="text"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="text"
            name="fullname"
            label="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="text"
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="date"
            name="dob"
            label="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Register
          </Button>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Already have an account?{' '}
            <Link to="/login">
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
