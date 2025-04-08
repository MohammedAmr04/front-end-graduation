import { Container } from "react-bootstrap";
import BookSlider from "./../components/common/book-slider/BookSlider";
import Landing from "./../components/common/landing/Landing";

export default function Home() {
  return (
    <div>
      <Landing />

      <Container>
        <BookSlider />
        <BookSlider />
        <BookSlider />
      </Container>
    </div>
  );
}
