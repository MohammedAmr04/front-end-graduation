import AdminVisitsBarchart from "../components/AdminVisitsBarchart";
import AdminUsersPiechart from  "../components/AdminUsersPiechart"


export default function AdminDashboard() {
  return (
    <div>
      <AdminVisitsBarchart />
      <AdminUsersPiechart /> 
      
    </div>
  );
}