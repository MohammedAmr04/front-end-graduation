import { Container } from "react-bootstrap";
import BookSlider from "./../components/common/book-slider/BookSlider";
import Landing from "./../components/common/landing/Landing";
import QuotesSection from "../components/common/quotes/QuotesSection";
import ServicesSection from "./../components/common/servicesSection/ServicesSection";

export default function Home() {
  return (
    <div>
      <Landing />
      <Container>
        <BookSlider />
        <ServicesSection />
      </Container>
      <QuotesSection />
    </div>
  );
}
