"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-error";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
    const currentRole = useCurrentRole();

    if (currentRole !== allowedRole) {
        return (
            <FormError message="You do not have permission to view this content." />
        )
    }

    return (
        <>{children}</>
    )
}