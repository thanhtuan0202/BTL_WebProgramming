// LoginPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { setLoginAction } from './../../../redux/Reducers/loginUser';
import axios from "axios";
import { useJwt } from "react-jwt";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // function decodeJWT(jwt) {
  //   const [header, payload, signature] = jwt.split('.');
    
  //   const decodedHeader = JSON.parse(base64URLDecode(header));
  //   const decodedPayload = JSON.parse(base64URLDecode(payload));
  //   const decodedSignature = base64URLDecode(signature);
  //   console.log(decodedHeader, decodedPayload, decodedSignature)
  //   return {
  //     header: decodedHeader,
  //     payload: decodedPayload,
  //     signature: decodedSignature
  //   };
  // }
  
  // function base64URLDecode(text) {
  //   const paddedText = text + '='.repeat(4 - (text.length % 4)); // Add padding if needed
  //   const decoded = atob(paddedText.replace(/-/g, '+').replace(/_/g, '/'));
  //   return decoded;
  // }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const result = await axios.post(
          `http://localhost/assignment/backend/index.php/auth/login`,
          { username: username, password: password}
        );
        console.log(result);
        if (result.data && result.data.data.token) {
          alert("Đăng nhập thành công!");
          localStorage.setItem("token", JSON.stringify({token: result.data.data.token}));

          const payload = result.data.data.user;
          localStorage.setItem("user", JSON.stringify(payload));
          navigate('/');
        }
        else if (result.data && result.data.data.error){
          alert(result.data.data.error);
        }
      } catch (err) {
        alert("Đăng nhập không thành công! Vui lòng thử lại!");
      }
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h1">
          Login
        </Typography>
        {error && (
          <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 3 }}>
          <TextField
            type="username"
            label="Username"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            required
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Login
          </Button>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Don't have an account?{' '}
            <Link to="/register" >
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
