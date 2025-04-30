
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  className,
}: FormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="form-label">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
};

export default FormField;
