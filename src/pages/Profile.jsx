import { Outlet } from "react-router";
import HeaderProfile from "../components/common/profile/headerprofile/HeaderProfile";

export default function Profile() {
  return (
    <div>
      <HeaderProfile />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
