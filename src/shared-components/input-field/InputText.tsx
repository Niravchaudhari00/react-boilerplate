import { PropsWithChildren } from "react";
import { ControllerRenderProps, FieldErrors, FieldValues } from "react-hook-form";
import { cn } from "../../utils/twMerger";
import TextFieldErrorMessage from "../TextFieldErrorMessage";

type InputTextProps<TFieldValues extends FieldValues> = {
  field: ControllerRenderProps<TFieldValues>;
  type: string;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  error?: FieldErrors<TFieldValues>;
};

const InputText = <TFieldValues extends FieldValues>({
  field,
  type,
  label,
  placeholder,
  className,
  error,
  required = false,
}: PropsWithChildren<InputTextProps<TFieldValues>>) => {
  const fieldError = error?.[field.name]?.message?.toString();
  return (
    <div className={cn("", className)}>
      {label && (
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        value={field.value || ""}
        className={cn(
          "mt-1 px-4 py-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring",
          fieldError ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
        )}
      />
      {fieldError && <TextFieldErrorMessage error={fieldError} />}
    </div>
  );
};

export default InputText;
