"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useCurrentUser } from "@/hooks/use-current-user";
import { settings } from "@/actions/settings";
import { settingsSchema } from "@/schemas";
import { UserRole } from "@prisma/client";

const SettingsPage = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const user = useCurrentUser();
    const { update } = useSession();

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: undefined,
            newPassword: undefined,
            confirmNewPassword: undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
            role: user?.role || UserRole.USER,
        },
    });

    const onSubmit = (data: z.infer<typeof settingsSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            settings(data).then((res) => {
                if (res?.error) {
                    form.reset();
                    setError(res?.error);
                }
                if (res?.success) {
                    form.reset();
                    setSuccess(res?.success);
                    update();
                }
            }).catch(() => setError("Something went wrong!"));
        });
    }

    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">
                    ⚙️ Settings
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} placeholder="John Doe" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} placeholder="john.doe@example.com" type="email" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} placeholder="********" type="password" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} placeholder="********" type="password" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmNewPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm New Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} placeholder="********" type="password" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.USER}>User</SelectItem>
                                                <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <FormField
                                    control={form.control}
                                    name="isTwoFactorEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Two Factor Authentication</FormLabel>
                                                <FormDescription>Add an extra layer of security to your account</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button disabled={isPending} type="submit" className="w-full cursor-pointer">
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default SettingsPage;