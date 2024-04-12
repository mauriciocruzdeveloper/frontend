interface BaseInputFieldProps {
  className?: string;
  labelText: string;
  name: string;
  errors: Record<string, string>;
}

interface TextInputFieldProps extends BaseInputFieldProps {
  type: "text" | "email" | "password";
  value?: string;
}

interface NumberInputFieldProps extends BaseInputFieldProps {
  type: "number";
  value?: number;
}

type AplInputFieldProps = TextInputFieldProps | NumberInputFieldProps;

export function AplInputField({
  className,
  labelText,
  name,
  value,
  type,
  errors,
}: AplInputFieldProps): JSX.Element {
  console.log('&&&ERRORS EN INPUT: ', errors);
  return (
    <div className={`${className} flex flex-col w-64 my-2`}>
      <label
        className="text-sm font-semibold text-gray-600"
        htmlFor={name}
      >
        {labelText}
      </label>
      <input
        className="h-10 px-3 py-2 border border-gray-300 rounded-md"
        type={type}
        id={name}
        name={name}
        defaultValue={value}
      />
      {errors[name] && <label className="text-red-500">{errors[name]}</label>}
    </div>
  );
}
