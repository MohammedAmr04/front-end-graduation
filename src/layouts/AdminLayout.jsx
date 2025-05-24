import { Outlet } from "react-router-dom";
// import AdminHeader from "../admin/components/AdminHeader";
import AdminSidebar from "../admin/components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="admin-layout d-flex" style={{ minHeight: "100vh" }}>
      {/* <AdminHeader /> */}
      <AdminSidebar />
      <div
        className="admin-content flex-grow-1 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Outlet />
      </div>
    </div>
  );
}
