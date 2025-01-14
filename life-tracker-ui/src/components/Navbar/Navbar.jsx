import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  './Navbar.css'

function NavBar() {


  const navigate = useNavigate();

  const handleLogout = async (event) => {

    event.preventDefault();
    localStorage.removeItem("life_tracker_token");
    navigate('/');
    
  }


  return (
    
    <Box>
      <AppBar id="lt-navbar" position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, width: "50%" }}>
          <Link to={'/'}>
            <img id="logo" src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg"/>
          </Link>
          </Typography>
        
              {
                !localStorage.getItem("life_tracker_token") ? 

                <ul className="buttons">
                  <li>
                    <a href="/login" style={{ flexGrow: 1 }}>Login</a>
                  </li>

                  <li>
                    <a href='/register' style={{ flexGrow: 1 }}>Register</a>
                  </li>
                </ul>

                :

                <ul className="buttons">
                  <li>
                    <a href='/activity'>Overview</a>
                  </li>

                  <li>
                    <a href='/exercise'>Exercise</a>
                  </li>

                  <li>
                    <a href="/nutrition">Nutrition</a>
                  </li>

                  <li>
                    <a href="/sleep">Sleep</a>
                  </li>

                  <li className="sign-out" onClick={handleLogout}>Logout</li>
                  </ul>


              }
        </Toolbar>
      </AppBar>
    </Box>
  );
  }
  
  export default NavBar;