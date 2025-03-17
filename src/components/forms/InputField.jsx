import PropTypes from "prop-types";
import "./InputField.css";

function InputField({
  label = "",
  labelRender = true,
  className = "",
  type = "text",
  name = "",
  value = "",
  placeHolder = `Enter Your ${label}`,
  onChange = () => {},
  error = "",
}) {
  return (
    <div className={`input-field ${className}`}>
      {labelRender && <label className="mb-1 ps-2">{label}</label>}
      <input
        className="rounded-5"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default InputField;

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  labelRender: PropTypes.bool,
  className: PropTypes.string,
};
