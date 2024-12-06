import { FC } from "react";
type TextFieldErrorMessageProps = {
  error: string;
};
const TextFieldErrorMessage: FC<TextFieldErrorMessageProps> = ({ error }) => {
  return <>{error && <span className="text-red-500 text-sm ">{error}</span>}</>;
};

export default TextFieldErrorMessage;
