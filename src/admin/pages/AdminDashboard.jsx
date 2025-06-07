import AdminVisitsBarchart from "../components/AdminCharts/AdminVisitsBarchart";
import TotalUsersCars from "../AdminCards/TotalUsersCard";
import TotalBooksCars from "../AdminCards/TotalBooksCard";
import TotalCommunityCard from "../AdminCards/TotalCommunityCard";
import PostsDonutChart from "../components/AdminCharts/PostsDonutChart";
import TotalPostsCard from "../AdminCards/TotalPostsCard";
import "./AdminDashboard.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function AdminDashboard() {
  const downloadPDF = () => {
    const input = document.getElementById("dashboard-content");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard.pdf");
    });
  };

  return (
    <div className="admin-dashboard-root">
      <div id="dashboard-content" className="admin-dashboard-content">
        <div className="admin-dashboard-header">
          <h2 className="admin-dashboard-title">Admin Dashboard</h2>
          <button className="pdf-button" onClick={downloadPDF}>
            Download Dashboard (PDF)
          </button>
        </div>
        <div className="admin-dashboard-barchart">
          <AdminVisitsBarchart />
        </div>
        <div className="admin-dashboard-summary-header">
          <h4 className="admin-dashboard-summary-title">Quick Summary</h4>
          <div className="admin-dashboard-summary-divider" />
        </div>
        <div className="admin-cards-container admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <TotalUsersCars />
          </div>
          <div className="admin-dashboard-card">
            <TotalBooksCars />
          </div>
          <div className="admin-dashboard-card">
            <TotalCommunityCard />
          </div>
        </div>
        <div className="postscharts admin-dashboard-postscharts">
          <div className="admin-dashboard-postschart">
            <PostsDonutChart />
          </div>
          <div className="admin-dashboard-postscard">
            <TotalPostsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
