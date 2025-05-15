import { Outlet } from "react-router-dom";
import HeaderProfile from "../components/common/profile/headerprofile/HeaderProfile";
import useProfile from "../hooks/useProfile";

export default function Profile() {
  const { profile } = useProfile();
  return (
    <div>
      <HeaderProfile />
      <main className="container">
        <Outlet context={profile} />
      </main>
    </div>
  );
}
