import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7159/api/Account/Register",
        {
          username: user.username,
          email: user.email,
          password: user.password,
        }
      );

      console.log("Registration Successful:", response.data);
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login justify-content-center align-items-center overflow-hidden">
      <Form className="p-5 rounded-3 mx-auto" onSubmit={handleSubmit}>
        <p className=" fw-bold fs-5 text-center">Create New account</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter your username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter your Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button className="w-100" variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <div className=" d-xl-block d-none">
        <img src="/src/assets/forms.jpg" alt="" className="" />
      </div>
    </div>
  );
}
