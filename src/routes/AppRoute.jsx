import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Login from "./../pages/Login";
import Home from "./../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Register from "./../pages/Register";
import AboutUs from "../components/common/about-us/AboutUs";
import ContactUs from "./../pages/ContactUs";
import Community from "../pages/Community";
import Test from "../test/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/community",
        element: <Community />,
      },
    ],
  },
  {
    path: "/community",
    element: <Community />,
    errorElement: <ErrorPage />,
  },
]);
export default function AppRoute() {
  return <RouterProvider router={router} />;
}
