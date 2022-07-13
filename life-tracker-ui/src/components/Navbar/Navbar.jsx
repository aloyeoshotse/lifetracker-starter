import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import  './Navbar.css'

function NavBar({ loggedIn, setLoggedIn }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, width: "50%" }}>
          <Link to={'/'}>
            <img id="logo" src="/src/lifetracker-logo.png"/>
          </Link>
          </Typography>
          <div className="buttons">
            <Button color="inherit"  sx={{ flexGrow: 1 }}>Activity</Button>
            <Button color="inherit" sx={{ flexGrow: 1 }}>Exercise</Button>
            <Link to={'/nutrition'}>
              <Button color="inherit" sx={{ flexGrow: 1 }}>Nutrition</Button>
            </Link>
            <Button color="inherit" sx={{ flexGrow: 1 }}>Sleep</Button>
            <Link to={'/login'}>
              <Button color="inherit" sx={{ flexGrow: 1 }}>Login</Button>
            </Link>
            <Link to={'/register'}>
              <Button color="inherit" sx={{ flexGrow: 1 }}>Register</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
  }
  
  export default NavBar;