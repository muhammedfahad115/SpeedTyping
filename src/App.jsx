import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRoutes from "./Routes/UserRoutes"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRoutes />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

