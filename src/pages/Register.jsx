import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7159/api/Account/Register",
        {
          firstName: user.firstName,
          lastName: user.lastName,
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
    <div className="register w-100 d-flex justify-content-center align-items-center my-5">
      <Form className="p-5 rounded-3" onSubmit={handleSubmit}>
        <p className="fw-bold fs-5 text-center">Register to your account</p>

        <div className="d-flex gap-4 justify-content-between flex-column flex-md-row">
          <Form.Group
            className="w-100 mb-3 mx-auto"
            controlId="formBasicFirstName"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group
            className="w-100 mb-3 mx-auto"
            controlId="formBasicLastName"
          >
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        <div className="d-flex gap-4 justify-content-between flex-column flex-md-row">
          <Form.Group
            className="w-100 mb-3 mx-auto"
            controlId="formBasicUsername"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="w-100 mb-3 mx-auto" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        <div className="d-flex gap-4 justify-content-between flex-column flex-md-row">
          <Form.Group
            className="w-100 mb-3 mx-auto"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="w-100 mb-3 mx-auto" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        <div className="d-flex gap-4 justify-content-between flex-column flex-md-row">
          <Form.Group
            className="w-100 mb-3 mx-auto"
            controlId="formBasicGender"
          >
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="w-100 mb-3  mx-auto"
            controlId="formBasicDateOfBirth"
          >
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        <Button
          className=" position-relative translate-middle-x start-50"
          variant="primary"
          type="submit"
        >
          Register Now
        </Button>
      </Form>
    </div>
  );
}
