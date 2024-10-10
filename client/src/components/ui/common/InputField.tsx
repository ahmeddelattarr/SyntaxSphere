import { Input } from './Input';
import { Label } from './Label';

interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    variant?: "sign" | "sleep";
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    id,
    type,
    placeholder,
    value,
    onChange,
    required = false,
    variant = "sign",
}) => (
    <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            variant={variant}
        />
    </div>
);

export default InputField;
