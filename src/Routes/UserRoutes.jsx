import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import LandingPage from '../Pages/LandingPage'
import Content from '../Components/Content'
import About from '../Components/About'
import Context from '../Context/Context'

function UserRoutes() {
  return (
    <>
    <Context>
        <Routes>
          <Route path='/' element={<LandingPage />}>
            <Route path='/' element={<Content />}></Route>
            <Route path='/about' element={<About />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
    </Context>
      </>
  )
}

export default UserRoutes