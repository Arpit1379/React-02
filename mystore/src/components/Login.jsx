// LoginForm.jsx
import React, { useState } from 'react';
import { Card, Container, TextField, Button, Typography, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';


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

function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <Typography variant="h5" component="h2" gutterBottom>
          Login to Your Account
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
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
}

export default Login;
