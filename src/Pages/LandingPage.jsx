import { Outlet } from "react-router-dom"
import Content from "../Components/Content/Content"
import Header from "../Components/Header/Header"

function LandingPage() {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default LandingPage