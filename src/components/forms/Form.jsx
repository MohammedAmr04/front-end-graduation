import { useState } from "react";
import InputField from "./InputField";
import "./Form.css";
import PropTypes from "prop-types";
function Form({ fields, onSubmit, additionalData }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = { ...additionalData, ...formData };
    onSubmit(combinedData);
  };

  return (
    <form className="form rounded-4" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          type={field.type}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          placeHolder={field.placeHolder}
          error={field.error}
        />
      ))}
      <div className="mt-2 justify-content-center d-flex align-items-center">
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;

Form.propTypes = {
  fields: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  additionalData: PropTypes.object,
};
