import * as React from "react"
import { useState } from 'react'
import NavBar from '../Navbar/Navbar';
import Container from '@mui/material/Container';
import ReactDOM from "react-dom/client";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register"
import Profile from "../Profile/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NutritionPage from "../NutritionPage/NutritionPage";


function App() {

  const [error, setError] = useState("");
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  

  function isFormInvalid(object) {
    for (var prop in object) {
      if (object[prop].length < 1) {return true}
    }

    return false;
  }

  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Container maxWidth={false} sx={{backgroundColor: "gold", flexGrow: 1}}>
        {
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} 
                                                error={error} setError={setError} invalidForm={isFormInvalid} />}/>
            <Route path='/register' element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} 
                                                error={error} setError={setError} invalidForm={isFormInvalid} />}/>
            <Route path='/activity' element={<Profile/> } />
            <Route path='/nutrition' element={<NutritionPage/> } />
          </Routes>
        }
      </Container>
    </BrowserRouter>
  )
}

export default App
