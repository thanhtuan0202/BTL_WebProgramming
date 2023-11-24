import { styled } from '@mui/system';
import bgIn from '../../../assets/bglogin.png';
import bgUp from '../../../assets/bgsignup.png';

export const RootContainer = styled('div')({
  height: '111vh',
  width: '100%',
});

export const FlexBox = styled('div')({
  position: 'relative',
});

export const SignIn = styled('div')({
  position: 'absolute',
  top: 0,
  right: '0',
  width: '100%',
  height: '100%',
  transition: 'all 1s',
});

export const SignUp = styled('div')({
  position: 'absolute',
  top: 0,
  left: '0',
  transform: 'translateX(100%)',
  width: '100%',
  height: '100%',
  transition: '1s 0.7s ease-in-out',
});

export const BoxSignIn = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  background: `url(${bgIn}) no-repeat right center`,
  backgroundSize: 'cover',
});

// Define other styled components similarly

export const InputField = styled('div')({
  width: '100%',
  height: '40px',
  display: 'flex',
  backgroundColor: '#f0f0f0',
  borderRadius: '20px',
  margin: '20px 0',
  alignItems: 'center',
  padding: '0 8px',
  boxShadow: '0 10px 30px 0 #1976d250',
  '& svg': {
    fontSize: '25px',
    width: '20px',
    height: '40px',
    color: '#acacac',
    margin: '0 0 0 10px',
  },
  '& input': {
    border: 'none',
    outline: 'none',
    backgroundColor: '#f0f0f0',
    color: '#500',
    fontSize: '16px',
    fontWeight: '600',
    width: '100%',
    borderRadius: '20px',
    padding: '10px',
  },
});

export const ButtonBox = styled('div')({
  '& button': {
    width: '150px',
    height: '40px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 10px 30px 0 #1976d250',
    borderRadius: '20px',
  },
});
