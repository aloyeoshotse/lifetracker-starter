import { useState } from 'react'
import NavBar from '../Navbar/Navbar';
import Container from '@mui/material/Container';
import './App.css'

function App() {

  return (
    <>
     <NavBar/>
     <Container maxWidth={false} sx={{backgroundColor: "gold", flexGrow: 1}}>my container</Container>
     {/* can use flex-grow with components */}
    </>
  )
}

export default App
