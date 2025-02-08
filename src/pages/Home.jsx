import { Container } from "react-bootstrap";
import BookSlider from "./../components/common/book-slider/BookSlider";

export default function Home() {
  return (
    <div className="py-5">
      <Container>
        <BookSlider />
        <BookSlider />
        <BookSlider />
      </Container>
    </div>
  );
}
