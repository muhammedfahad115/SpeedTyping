import { Outlet } from "react-router-dom"
import Content from "../Components/Content"
import Header from "../Components/Header"

function LandingPage() {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default LandingPage