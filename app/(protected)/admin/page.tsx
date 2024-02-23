"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const onApiRouteClick = async () => {
    fetch("/api/admin")
      .then((res) => {
        if (res.ok) {
          toast("OKEY, you can access a this api");
          return;
        }
        toast("FORBIDDEN, you can't access a this api");
      })
      .catch(console.log);
  };

  const onServerActionClick = async () => {
    admin().then((res) => {
      if (res.error) return toast(res.error);
      if (res.success) return toast(res.success);
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-bold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allow to see this content!" />
        </RoleGate>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
