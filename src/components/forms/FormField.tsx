
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
    <div className={cn("space-y-2 relative", className)}>
      <Label htmlFor={id} className="form-label inline-block pl-1">
        {label}
      </Label>
      <div className="relative">
        <Input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input pl-3 transition-all duration-200 focus:translate-x-1 border-l-2 border-l-asklegal-accent/50 focus:border-l-asklegal-accent"
        />
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-asklegal-accent transition-all duration-300 group-focus-within:w-full"></div>
      </div>
    </div>
  );
};

export default FormField;
