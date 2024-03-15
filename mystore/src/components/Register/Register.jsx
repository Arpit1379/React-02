// LoginForm.jsx
import React, { useState } from 'react';
import { Card, Container, TextField, Button, Typography, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import toast from 'react-hot-toast';


const theme = createTheme({
    palette: {
      primary: {
        main: '#0d6efd', // Example color
      },
      // Define other colors as needed
    },
    // You can extend the theme with custom properties as needed
  });
  

const useStyles = makeStyles(() => ({
  card: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    const res =await axios.post("http://localhost:3002/api/auth/register",{
        username,email,password,role
    });
    const data=res.data;
    if(data)
    toast.success(data.response);
    else 
    toast.error("UnsucessFully Registration");
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <Typography variant="h5" component="h2" gutterBottom>
          Register to Your Account
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
             select
             label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            variant="outlined"
            style={{ margin: '10px 0' }} // Add some spacing
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
         </TextField>
         <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </Card>
    </Container>
  );
}

export default Register;
