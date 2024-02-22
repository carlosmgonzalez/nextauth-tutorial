import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Opps! Something went wrong!"
    >
      <div className="flex justify-center items-center w-full">
        <ExclamationTriangleIcon className="w-7 h-7 text-destructive" />
      </div>
    </CardWrapper>
  );
};
