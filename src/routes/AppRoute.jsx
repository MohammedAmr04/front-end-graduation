import { RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import Profile from './../pages/Profile';
import Login from './../pages/Login';
import Home from './../pages/Home';
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Register from './../pages/Register';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/profile',
        element: <Profile />
      },

    ]
  }
])
export default function AppRoute() {
    return (
      <RouterProvider router={router} />
  )
}
