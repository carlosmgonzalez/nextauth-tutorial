"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

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
    return <span>Todo: Implement modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
