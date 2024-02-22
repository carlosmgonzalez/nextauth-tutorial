"use client";

import { BiLoader } from "react-icons/bi";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    setSuccess("");
    setError("");

    if (!token) {
      setError("Token not exist!");
      return;
    }

    startTransition(() => {
      newVerification(token)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong!");
        });
    });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Confirming your verification"
    >
      <div className="flex items-center justify-center w-full">
        {isPending ? (
          <BiLoader className="w-7 h-7 animate-spin" />
        ) : (
          <>
            <FormSuccess message={success} />
            {!success && <FormError message={error} />}
          </>
        )}
      </div>
    </CardWrapper>
  );
};
