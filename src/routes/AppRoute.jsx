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
import BookSwap from "../pages/BookSwap";
import AddBook from "../admin/pages/AddBook";
import ManageBook from "../admin/pages/ManageBook";
import AdminLayout from "../layouts/AdminLayout";
import AddCommunity from "../admin/pages/AddCommunity";
import ManageCommunity from "../admin/pages/ManageCommunity";
import Profile from "./../pages/Profile";
import PostsProfile from "../components/common/profile/PostsProfile/PostsProfile";
import DashboardProfile from "../components/common/profile/dashboard/DashboardProfile";

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
        path: "/bookSwap",
        element: <BookSwap />,
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
      {
        path: "/profile",
        element: <Profile />,
        children: [
          { path: "posts", element: <PostsProfile /> },
          { path: "dashboard", element: <DashboardProfile /> },
        ],
      },
    ],
  },
  {
    path: "/community",
    element: <Community />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "addbook", element: <AddBook /> },
      { path: "managebook", element: <ManageBook /> },
      { path: "addcommunity", element: <AddCommunity /> },
      { path: "managecommunity", element: <ManageCommunity /> },
    ],
  },
]);
export default function AppRoute() {
  return <RouterProvider router={router} />;
}
