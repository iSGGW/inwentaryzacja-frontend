import "./inputs.css";

interface inputProps {
  label: string;
  prefix?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
}

const Input = ({ label, prefix, type, onChange, name }: inputProps) => {
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <div className="input">
        {prefix && (
          <div className="prefix">
            <img src={prefix} />
          </div>
        )}
        <input type={type} name={name} onChange={onChange} />
      </div>
    </div>
  );
};

export default Input;
