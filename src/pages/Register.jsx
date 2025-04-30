import axios from "axios";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { login } from "../store/Auth/authSlice";
import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
});

export default function Register() {
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = registerSchema.validate(user, { abortEarly: false });
    if (error) {
      showError(error.details[0].message);
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://localhost:7159/api/Account/Register",
        user
      );

      showSuccess("Registered Successfully!");
      dispatch(login(response.data));

      setUser({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error.response);

      showError(error.response?.data || "Registration Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="overflow-hidden login justify-content-center align-items-center">
      <Form className="p-5 mx-auto rounded-3" onSubmit={handleSubmit}>
        <p className="text-center fw-bold fs-5">Create New account</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            value={user.lastName}
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
            value={user.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" />
              <span className="ms-2">Loading...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </Form>

      <div className="d-xl-block d-none">
        <img src="/src/assets/forms.jpg" alt="" className="" />
      </div>
    </div>
  );
}
