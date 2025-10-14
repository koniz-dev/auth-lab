"use client";

import { z } from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetSchema } from "@/schemas";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { reset } from "@/actions/reset";

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: z.infer<typeof resetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(data).then((res) => {
                setError(res?.error);
                setSuccess(res?.success);
            });
        });
    }

    return (
        <CardWrapper headerLabel="Forgot your password?" backButtonLabel="Back to login" backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full cursor-pointer">
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}