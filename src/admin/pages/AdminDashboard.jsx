import AdminVisitsBarchart from "../components/AdminCharts/AdminVisitsBarchart";
import TotalUsersCars from "../AdminCards/TotalUsersCard";
import TotalBooksCars from "../AdminCards/TotalBooksCard";
import TotalCommunityCard from "../AdminCards/TotalCommunityCard";
import PostsDonutChart from "../components/AdminCharts/PostsDonutChart";
import TotalPostsCard from "../AdminCards/TotalPostsCard";
import './AdminDashboard.css';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";  

export default function AdminDashboard() {
  const downloadPDF = () => {
    const input = document.getElementById('dashboard-content');  
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard.pdf");
    });
  };

  return (
    <>
      <div id="dashboard-content">
        <AdminVisitsBarchart /> 
        <h5>Quick Summary</h5>
        <div className="admin-cards-container">
          <TotalUsersCars />
          <TotalBooksCars />
          <TotalCommunityCard />
        </div>
        <div className="postscharts">
          <PostsDonutChart/>
          <TotalPostsCard/>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="pdf-button" onClick={downloadPDF}>
          Install Dashboard(PDF)
        </button>
      </div>
    </>
  );
}
