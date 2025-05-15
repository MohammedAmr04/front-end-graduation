export default function Footer() {
  return (
    <footer
      style={{
        background: "#222",
        color: "#fff",
        textAlign: "center",
        padding: "20px 0",
        marginTop: "40px",
      }}
    >
      <div>
        © {new Date().getFullYear()} Graduation Project. All rights reserved.
      </div>
    </footer>
  );
}
