"use client";

import { useCallback, useEffect, useState, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const hasVerified = useRef(false);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (hasVerified.current) return;
        
        if (!token) {
            setError("Invalid token!");
            return;
        }

        hasVerified.current = true;

        newVerification(token).then((res) => {
            setError(res?.error);
            setSuccess(res?.success);
        }).catch(() => {
            setError("Something went wrong!");
        });
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper headerLabel="Confirming your verification" backButtonLabel="Back to login" backButtonHref="/auth/login">
            <div className="w-full flex flex-col items-center justify-center">
                {
                    !error && !success && (
                        <BeatLoader />
                    )
                }
                {
                    !success && (
                        <FormError message={error} />
                    )
                }
                <FormSuccess message={success} />
            </div>
        </CardWrapper>
    )
}