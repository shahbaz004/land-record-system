import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import MintNFT from './MintNFT'

function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home />}/>
      <Route path='MintNFT' element = {<MintNFT />}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
