import { Outlet } from "react-router-dom";
import HeaderProfile from "../components/common/profile/headerprofile/HeaderProfile";

export default function Profile() {
  return (
    <div>
      <HeaderProfile />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
