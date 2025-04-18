import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from 'react-router-dom'

const Layout = () => {
    return (
        <div className = "app">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children: [
        {
            path : "/", 
            element: <Home/> 
        },
      ]
    },
  ])
