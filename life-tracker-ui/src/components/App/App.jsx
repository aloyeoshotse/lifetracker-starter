import * as React from "react"
import { useState } from 'react'
import NavBar from '../Navbar/Navbar';
import Container from '@mui/material/Container';
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register"
import Activity from "../Activity/Activity"
import NutritionPage from "../Activity/NutritionPage/NutritionPage";
import ExercisePage from "../Activity/ExercisePage/ExercisePage";
import SleepPage from "../Activity/SleepPage/SleepPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'


function App() {

  const [error, setError] = useState("");
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
            <Route path='/activity' element={<Activity error={error} setError={setError} invalidForm={isFormInvalid}/> } />
            <Route path='/nutrition' element={<NutritionPage error={error} setError={setError} invalidForm={isFormInvalid}/> } />
            <Route path='/exercise' element={<ExercisePage error={error} setError={setError} invalidForm={isFormInvalid}/> } />
            <Route path='/sleep' element={<SleepPage error={error} setError={setError} invalidForm={isFormInvalid}/> } />
          </Routes>
        }
      </Container>
    </BrowserRouter>
  )
}

export default App
