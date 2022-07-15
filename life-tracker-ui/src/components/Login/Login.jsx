import * as React from "react"
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import './Login.css'


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          LifeTracker
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();


function Login({ error, setError, invalidForm, loggedIn, setLoggedIn }) {

    const [loginForm, setLoginForm] = useState({
                                                email: "",
                                                password: ""
                                              })
    const navigate = useNavigate();
    var invalid = invalidForm(loginForm);



    const handleLoginFieldChange = (change) => {
        if (loginForm) {

          let newObj = loginForm;
          let property = change.target.name;
          let value = change.target.value;
          let pair = {[property] : value}
          newObj = {...newObj, ...pair}
          setLoginForm(newObj)
        
        }
    }
  

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data, error } = await apiClient.loginUser({ email: loginForm.email, password: loginForm.password })
        if (error) { setError(error.data.message) }
        if (data?.user) {
          setLoginForm({
                email: "",
                password: ""
              });
          apiClient.setToken(data.token)
          event.target.reset();
          navigate('/activity');
        }

      };

      React.useEffect(() => {
        console.log("error:",error)
      }, [error])
    
    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> 
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error ? <p style={{color: "red", fontWeight: "bold", textAlign: "center"}}>{error}</p> : <></>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleLoginFieldChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleLoginFieldChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled = {invalid}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    )
}

export default Login;