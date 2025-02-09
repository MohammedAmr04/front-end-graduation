import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function ContactUs() {
  const [result, setResult] = useState("");
  const [variant, setVariant] = useState("info");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    setVariant("info");

    const formData = new FormData(event.target);
    formData.append("access_key", "102ade3c-6c59-488c-825c-c8eeaac4ebd4");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully! ✅");
        setVariant("success");
        event.target.reset();
      } else {
        console.error("Error:", data);
        setResult(data.message || "Something went wrong! ❌");
        setVariant("danger");
      }
    } catch (error) {
      console.error("Network error:", error);
      setResult("Network Error. Please try again later. ❌");
      setVariant("danger");
    }
  };

  return (
    <div className="py-5 contact">
      <Container className="d-flex align-items-center">
        <div className="image-container d-lg-block d-none text-center ">
          <img
            src="/src/assets/Contact.png"
            className="w-100"
            alt="Contact Us"
          />
        </div>
        <Form
          onSubmit={onSubmit}
          className="p-5 rounded-3 shadow-lg mx-auto mx-lg-0 bg-light mt-4"
        >
          <p className="fw-bold fs-4 text-center">Get in Touch</p>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={4}
              placeholder="Write your message here..."
              required
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Send Message
          </Button>

          {result && (
            <Alert className="mt-3 text-center" variant={variant}>
              {result}
            </Alert>
          )}
        </Form>
      </Container>
    </div>
  );
}
