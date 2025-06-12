import { Button, Form, Spinner } from "react-bootstrap"; // 🆕 خلي بالك ضفت Spinner هنا
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { useToast } from "../hooks/useToast";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string()
    .min(9)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\\\|,.<>/?]).+$"
      )
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 9 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

export default function Login() {
  const { showSuccess, showError } = useToast();

  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false); // 🆕 حالة اللودينج
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

    setLoading(true); // 🆕 أول لما يبدأ الإرسال خلي اللودينج true

    try {
      const response = await axios.post(
        "https://localhost:7159/api/Account/Login",
        {
          email: user.email,
          password: user.password,
        }
      );
      showSuccess("Login Successful");
      dispatch(login(response.data));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      showError("Error during login");
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      setErrors({
        submit:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false); // 🆕 سواء نجح أو فشل رجع اللودينج false
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    if (errors) {
      setErrors(null);
    }
  };

  return (
    <div className="overflow-hidden login justify-content-center align-items-center">
      <Form className="p-5 mx-auto form-container" onSubmit={handleSubmit}>
        <p className="mb-4 text-center fw-bold fs-4">Welcome Back</p>

        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
            disabled={loading}
            className="form-control"
            required
          />
          {errors?.email && <p className="mt-2 text-danger">{errors.email}</p>}
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter your Password"
            onChange={handleChange}
            value={user.password}
            disabled={loading}
            className="form-control"
            required
          />
          {errors?.password && (
            <p className="mt-2 text-danger">{errors.password}</p>
          )}
        </Form.Group>

        <Button className="w-100 btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                animation="border"
                size="sm"
                role="status"
                className="me-2"
              />
              Loading...
            </>
          ) : (
            "Login now"
          )}
        </Button>

        <p className="mt-4 text-center">
          <span className="text-black-50">{`Don't have an account?`}</span>{" "}
          <Link to="/register" className="text-primary">
            Register now
          </Link>
        </p>
      </Form>

      <div className="d-xl-block d-none">
        <img src="/src/assets/forms.jpg" alt="" className="" />
      </div>
    </div>
  );
}
