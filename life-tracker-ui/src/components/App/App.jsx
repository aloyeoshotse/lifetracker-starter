import * as React from "react"
import { useState } from 'react'
import NavBar from '../Navbar/Navbar';
import Container from '@mui/material/Container';
import ReactDOM from "react-dom/client";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'


function App() {

  const [error, setError] = useState("");
  

  function isFormInvalid(object) {
    for (var prop in object) {
      if (object[prop].length < 1) {return true}
    }

    return false;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth={false} sx={{backgroundColor: "gold", flexGrow: 1}}>
        {
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register error={error} setError={setError} invalidForm={isFormInvalid} />}/>
          </Routes>
        }
      </Container>
    </BrowserRouter>
  )
}

export default App
