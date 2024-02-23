"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { LoginForm } from "./login-form";

interface Props {
  children: ReactNode;
  mode?: "modal" | "redirect";
  asChild: boolean;
}

export const LoginButton = ({
  asChild,
  children,
  mode = "redirect",
}: Props) => {
  const route = useRouter();

  const onClick = () => {
    route.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
