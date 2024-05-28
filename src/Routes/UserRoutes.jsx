import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import LandingPage from '../Pages/LandingPage'

function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </>
  )
}

export default UserRoutes