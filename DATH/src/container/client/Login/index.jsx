import React, { useState } from 'react';
import { RootContainer, FlexBox, SignIn, SignUp, BoxSignIn, InputField, ButtonBox } from './login.style.page';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoginAction } from './../../../redux/Reducers/loginUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const renderSignInPage = (event) => {
  document.getElementById('signUpPage').style.transition = 'all 0.5s';
  document.getElementById('signInPage').style.transition =
    '0.7s 0.5s ease-in-out';
  document.getElementById('signInPage').style.transform = 'translateX(0px)';
  document.getElementById('signUpPage').style.transform = 'translateX(100%)';
};

const renderSignUpPage = (event) => {
  document.getElementById('signUpPage').style.transition =
    '0.7s 0.5s ease-in-out';
  document.getElementById('signInPage').style.transition = 'all 0.5s';
  document.getElementById('signInPage').style.transform = 'translateX(-100%)';
  document.getElementById('signUpPage').style.transform = 'translateX(0px)';
};

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    userName: "",
    passWord: "",
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    console.log(login);
  };

  const Login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/login-account",
        login
      );
      if (result.data) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("user", JSON.stringify(result.data));
        const dataload = {
          isLogin: true,
          userInfo: result.data.result,
        }
        dispatch(setLoginAction(dataload));
        navigate('/');
      }
    } catch (err) {
      alert("Đăng nhập không thành công! Vui lòng thử lại!");
    }
  };

  const [signUp, setSignUp] = useState(
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      username: "",
    }
  );

  const handleChangeSignUp = (e) => {
    const { name, value } = e.target;
    setSignUp({...signUp, [name]: value});
  }

  const Register = async (e) => {
    const cfpass = document.getElementById('cfpass');
    if (cfpass.value !== signUp.password)
    {
      alert('Mật khẩu không khớp! Vui lòng nhập lại!');
      return;
    }
    try {
      const result = await axios.post(
        "",
        signUp
      );
      alert("Đăng ký thành công!");
    } catch (err) {
      alert("Đăng ký không thành công!");
    }
  }
  return (
    <RootContainer>
      {/* ... Other elements */}
      <div className="navbar-detail">
        <Link to="/">
          <i className="bi bi-chevron-left" style={{ fontSize: 100 }}></i>
          Quay lại trang chủ
        </Link>
      </div>
      <FlexBox>
        <SignIn id="signInPage">
          <BoxSignIn>
            {/* ... */}
            <form action="" autoComplete="off">
              <InputField>
                <i className="bi bi-person"></i>
                <input
                  onChange={handleChangeLogin}
                  type="text"
                  name="userName"
                  placeholder="Tên đăng nhập"
                ></input>
              </InputField>
              {/* ... Other input fields */}
              <ButtonBox>
                <Button onClick={Login}>Đăng nhập</Button>
              </ButtonBox>
            </form>
          </BoxSignIn>
        </SignIn>

        <SignUp id="signUpPage">
          <BoxSignUp>
            {/* ... */}
            <form action="" autoComplete="off">
              <InputField>
                <i className="bi bi-envelope"></i>
                <input
                  onChange={handleChangeSignUp}
                  type="email"
                  name="email"
                  placeholder="email"
                ></input>
              </InputField>
              {/* ... Other input fields */}
              <ButtonBox>
                <Button onClick={Register}>ĐĂNG KÝ</Button>
              </ButtonBox>
            </form>
          </BoxSignUp>
        </SignUp>
      </FlexBox>
    </RootContainer>
  );
}

export default Login;
