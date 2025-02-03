import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Login() {
  let [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7159/api/Account/Login",
        {
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
        <p className=" fw-bold fs-5 text-center">Login to your account</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter your Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button className="w-100" variant="primary" type="submit">
          Login now
        </Button>
        <p className="mt-3 text-center  ">
          <span className=" text-black-50">{`Don't have an account?`}</span>{" "}
          <Link to="/register">Register now</Link>
        </p>
      </Form>
      <div className="d-xl-block d-none">
        <img src="/src/assets/forms.jpg" alt="" className="" />
      </div>
    </div>
  );
}
