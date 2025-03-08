import { Container } from "react-bootstrap";
import Form from "../components/forms/Form";

export default function BookSwap() {
  const fields = [
    {
      label: "Book Title",
      type: "text",
      name: "title",
    },
    {
      label: "Book Author",
      type: "text",
      name: "author",
    },
    {
      label: "Book Category",
      type: "text",
      name: "category",
    },
    {
      label: "Book Copy",
      type: "text",
      name: "copy",
    },
    {
      label: "Phone Number",
      type: "text",
      name: "phone",
    },
  ];
  const handleSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <Container className="py-5">
      <div className="d-lg-flex d-block justify-content-between align-items-center">
        <div className="w-auto mx-auto form-container d-block d-lg-flex justify-content-center align-items-center rounded-4">
          <Form fields={fields} onSubmit={handleSubmit} />
        </div>
        <div className="w-50 ">
          <img
            src="/src/assets/BooKSwap.jpg"
            className="w-100 d-none d-lg-block"
            alt="BookSwap"
          />
        </div>
      </div>
    </Container>
  );
}
