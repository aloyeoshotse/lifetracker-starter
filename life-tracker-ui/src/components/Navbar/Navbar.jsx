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

export function NavBar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={'/'}>
            <img id="logo" src="/src/lifetracker-logo.png"/>
          </Link>
          {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          >
          <MenuIcon />
          </IconButton> */}
          </Typography>
          <Link to={'/login'}>
            <Button color="inherit">Login</Button>
          </Link>
          <a href={'/register'}>
            <Button color="inherit">Register</Button>
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
  }
  
  export default NavBar;