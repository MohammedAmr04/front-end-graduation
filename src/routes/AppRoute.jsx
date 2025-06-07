import { RouterProvider } from "react-router-dom";
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
import ManageUsers from "../admin/pages/ManageUsers";
import ManagePosts from "../admin/pages/ManagePosts";
import Profile from "./../pages/Profile";
import PostsProfile from "../components/common/profile/PostsProfile/PostsProfile";
import DashboardProfile from "../components/common/profile/dashboard/DashboardProfile";
import Books from "../pages/books/Books";
import Book from "../components/common/book/Book";
import AboutMe from "../components/common/profile/aboutuser/AboutMe";
import AdminDashboard from "../admin/pages/AdminDashboard";
import BookReading from "../pages/BookReading/BookReading";
import Chat from "../pages/Chat";
import Wishlist from "../pages/wishlist/Wishlist";

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
        path: "home",
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "book/:id",
        element: <Book />,
      },
      {
        path: "bookSwap",
        element: <BookSwap />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "bookReading/:userid/:bookid",
        element: <BookReading />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "profile/:Userid",
        element: <Profile />,
        children: [
          { index: true, element: <PostsProfile /> },
          { path: "posts", element: <PostsProfile /> },
          { path: "dashboard", element: <DashboardProfile /> },
          { path: "about", element: <AboutMe /> },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { path: "addbook", element: <AddBook /> },
          { path: "managebook", element: <ManageBook /> },
          { path: "addcommunity", element: <AddCommunity /> },
          { path: "managecommunity", element: <ManageCommunity /> },
          { path: "manageusers", element: <ManageUsers /> },
          { path: "admindashboard", element: <AdminDashboard /> },
          { path: "manageposts", element: <ManagePosts /> },
        ],
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "chat/:userId",
        element: <Chat />,
      },
    ],
  },
]);

export default function AppRoute() {
  return <RouterProvider router={router} />;
}
