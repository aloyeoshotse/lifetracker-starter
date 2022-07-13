import * as React from "react"
import { useState } from 'react'
import NavBar from '../Navbar/Navbar';
import Container from '@mui/material/Container';
import ReactDOM from "react-dom/client";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register"
import Activity from "../Activity/Activity"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NutritionPage from "../NutritionPage/NutritionPage";


function App() {

  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  //localStorage.getItem(life_tracker_token)
  // const item = localStorage.getItem("life_tracker_token")
  // console.log("item =", item)

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
            <Route path='/activity' element={<Activity/> } />
            <Route path='/nutrition' element={<NutritionPage/> } />
          </Routes>
        }
      </Container>
    </BrowserRouter>
  )
}

export default App
