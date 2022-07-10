import * as React from "react"
import { useState } from 'react'
import NavBar from '../Navbar/Navbar';
import Container from '@mui/material/Container';
import ReactDOM from "react-dom/client";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth={false} sx={{backgroundColor: "gold", flexGrow: 1}}>
        {
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register'/>
          </Routes>
        }
      </Container>
    </BrowserRouter>
  )
}

export default App
