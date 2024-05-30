import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import LandingPage from '../Pages/LandingPage'
import Content from '../Components/Content'

function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<LandingPage/>}>
          <Route path='/' element={<Content/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </> 
  )
}

export default UserRoutes