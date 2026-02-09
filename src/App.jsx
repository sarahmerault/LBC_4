
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPages from './pages/auth/RegisterPages.jsx'
import Home from './pages/Home'

function App() {


  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<RegisterPages/>}/>
      <Route path="/register" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
   
      
    </>
  )
}

export default App
