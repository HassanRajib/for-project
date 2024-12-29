

import { BrowserRouter, Routes, Route }from 'react-router-dom'

import SignIn from './pages/SignIn'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
