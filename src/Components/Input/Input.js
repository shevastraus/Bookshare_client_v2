import "./Input.scss";

function Input({ label, name, type, onChange, value }) {
  return (
    <label className="form-field__label">
        {label}
        <input
        type={type}
        id={name}
        name={name}
        className="form-field__input"
        onChange={onChange}
        value={value}
      />
      </label>
  );
}

export default Input;