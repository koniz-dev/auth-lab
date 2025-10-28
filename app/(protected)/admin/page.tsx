"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { admin } from "@/actions/admin";
import { UserRole } from "@prisma/client";

const AdminPage = () => {
    const onApiRouteClick = async () => {
        const response = await fetch("/api/admin");
        if (response.ok) {
            toast.success("Allowed API Route!");
        } else {
            toast.error("Denied API Route!");
        }
    }

    const onServerActionClick = async () => {
        const response = await admin();
        if (response.success) {
            toast.success(response.success);
        } else {
            toast.error(response.error);
        }
    }
    
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">🔑 Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content." />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Admin-only API Route</p>
                    <Button onClick={onApiRouteClick}>
                        Click to test
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Admin-only Server Action</p>
                    <Button onClick={onServerActionClick}>
                        Click to test
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default AdminPage;