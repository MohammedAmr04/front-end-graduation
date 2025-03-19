import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

export default function Login() {
  let [user, setUser] = useState({ email: "", password: "" });
  let [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const { error } = schema.validate(user);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (validationErrors) return;

    try {
      const response = await axios.post(
        "https://localhost:7159/api/Account/Login",
        {
          email: user.email,
          password: user.password,
        }
      );

      console.log("Login Successful:", response.data);
      dispatch(login(response.data));
      navigate("/");
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      setErrors({
        submit:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (errors) {
      setErrors(null);
    }
  };

  return (
    <div className="overflow-hidden login justify-content-center align-items-center">
      <Form className="p-5 mx-auto rounded-3" onSubmit={handleSubmit}>
        <p className="text-center fw-bold fs-5">Login to your account</p>
        {errors?.submit && (
          <p className="text-center text-danger">{errors.submit}</p>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={user.email}
          />
          {errors?.email && <p className="text-danger">{errors.email}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter your Password"
            onChange={handleChange}
            value={user.password}
          />
          {errors?.password && <p className="text-danger">{errors.password}</p>}
        </Form.Group>
        <Button className="w-100" variant="primary" type="submit">
          Login now
        </Button>
        <p className="mt-3 text-center ">
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
