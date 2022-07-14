import * as React from "react";
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
// import { useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import './Register.css';


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


function Register({ error, setError, invalidForm, loggedIn, setLoggedIn }) {
  
    const [registerForm, setRegisterForm] = useState({
                                                        firstName: "",
                                                        lastName: "",
                                                        email: "",
                                                        userName: "",
                                                        password: "",
                                                      });
    const navigate = useNavigate()
    const [samePassword, setSamePassword] = useState(false);
    const [confirmPw, setConfirmPw] = useState()

    var invalid = invalidForm(registerForm);



    const handleRegisterFieldChange = (change) => {
        if (registerForm) {

          if (change.target.name != 'confirm-password'){
            let newObj = registerForm;
            let property = change.target.name;
            let value = change.target.value;
            let pair = {[property] : value}
            newObj = {...newObj, ...pair}
            setRegisterForm(newObj)
          }

          else {
            let value = change.target.value
            setConfirmPw(value)

            if (change.target.value == registerForm.password) {
              setSamePassword(true)
              invalid = false
            }
            else{
              setSamePassword(false)
              invalid = true
            }
          }

        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        

        const { data, error } = await apiClient.registerUser({ 
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
          email: registerForm.email, 
          userName: registerForm.userName,
          password: registerForm.password
        })
        if (error) { setError((e) => ({...e, form: null})) }
        if (data?.user) {
          setRegisterForm({
                firstName: "",
                lastName: "",
                email: "",
                userName: "",
                password: ""
              });
          apiClient.setToken(data.token)
          event.target.reset();
          // setLoggedIn(true);
          navigate('/activity');
        }

      };

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
              Sign up
            </Typography>
            {error ? <p style={{color: "red", fontWeight: "bold", textAlign: "center"}}>{error}</p> : <></>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleRegisterFieldChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleRegisterFieldChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleRegisterFieldChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    autoComplete="user-name"
                    onChange={handleRegisterFieldChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleRegisterFieldChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="confirm-new-password"
                    onChange={handleRegisterFieldChange}
                  />
                  {!samePassword && confirmPw ? <p style={{color: "red"}}>Passwords do not match</p> : <></>}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              {samePassword && !invalid ?

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled = {false}>
                  Sign Up
                </Button>

                :

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled = {true}>
                  Sign Up
                </Button>
              }
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    )
}

export default Register;