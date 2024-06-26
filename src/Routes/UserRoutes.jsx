import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import LandingPage from '../Pages/LandingPage'
import Context from '../Context/Context'
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner'
import { Suspense, lazy } from 'react'

const About = lazy(() => import('../Components/About/About'))
const Contact = lazy(() => import('../Components/Contact/Contact'))
const Content = lazy(() => import('../Components/Content/Content'))

function UserRoutes() {
  return (
    <>
      <Context>
        <Routes>
          <Route path='/' element={<LandingPage />}>
            <Route path='/' element={
              <Suspense fallback={<LoadingSpinner />}>
                <Content />
              </Suspense>
            }></Route>
            <Route path='/about' element={
              <Suspense fallback={<LoadingSpinner />}>
                <About />
              </Suspense>
            }></Route>
            <Route path='/contact' element={
              <Suspense fallback={<LoadingSpinner />}>
                <Contact />
              </Suspense>
            }></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Context>
    </>
  )
}

export default UserRoutes