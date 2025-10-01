"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export const Social = () => {
    return (
        <div className="w-full flex items-center gap-x-2">
            <Button size="lg" className="flex-1 cursor-pointer" variant="outline" onClick={() => {}}>
                <FcGoogle className="w-5 h-5" />
            </Button>
            <Button size="lg" className="flex-1 cursor-pointer" variant="outline" onClick={() => {}}>
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    )
}