import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  './Navbar.css'

function NavBar({ loggedIn, setLoggedIn }) {


  const navigate = useNavigate();

  const handleLogout = async (event) => {

    event.preventDefault();
    localStorage.removeItem("life_tracker_token");
    setLoggedIn(false);
    navigate('/');
    
  }


  return (
    
    <Box>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, width: "50%" }}>
          <Link to={'/'}>
            <img id="logo" src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg"/>
          </Link>
          </Typography>
        
              {
                !localStorage.getItem("life_tracker_token") ? 

                <div className="buttons">
                  <Link to={'/login'}>
                    <Button color="inherit" sx={{ flexGrow: 1 }}>Login</Button>
                  </Link>

                  <Link to={'/register'}>
                    <Button color="inherit" sx={{ flexGrow: 1 }}>Register</Button>
                  </Link>
                </div>

                :

                <div className="buttons">
                  <Link to={'/activity'}>
                    <Button color="inherit">Overview</Button>
                  </Link>

                  <Link to={'/exercise'}>
                    <Button color="inherit">Exercise</Button>
                  </Link>

                  <Link to={'/nutrition'}>
                    <Button color="inherit">Nutrition</Button>
                  </Link>

                  <Link to={'/sleep'}>
                    <Button color="inherit">Sleep</Button>
                  </Link>
                  <Button color="inherit" onClick={handleLogout}>Sign Out</Button>
                  </div>
              }
        </Toolbar>
      </AppBar>
    </Box>
  );
  }
  
  export default NavBar;