import { useFormStatus } from "react-dom";
import Button from "./Button";
import { SpinnerMini } from "./Spinner";

function SubmitButton({ children, className, ...rest }) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...rest}
      disabled={pending}
      className={`flex justify-center items-center gap-x-4 py-4 ${className}`}
    >
      {children}
      {pending && <SpinnerMini />}
    </Button>
  );
}

export default SubmitButton;
