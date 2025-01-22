import { Outlet } from "react-router";
import { Container } from "react-bootstrap";

export default function MainLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
