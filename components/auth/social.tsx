"use client";

import { signIn } from 'next-auth/react'

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { Button } from "@/components/ui/button";

export const Social = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <div className="w-full flex items-center gap-x-2">
            <Button size="lg" className="flex-1 cursor-pointer" variant="outline" onClick={() => onClick("google")}>
                <FcGoogle className="w-5 h-5" />
            </Button>
            <Button size="lg" className="flex-1 cursor-pointer" variant="outline" onClick={() => onClick("github")}>
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    )
}