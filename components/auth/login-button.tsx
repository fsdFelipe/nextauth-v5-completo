'use client'
import React from "react"
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
}

const LoginButton = ({ children, mode = 'redirect', asChild }: LoginButtonProps) => {
    const router = useRouter()

    const onClick = () => {
        console.log('botão clicado')
        router.push('/auth/login')
    }
    return (
        <span onClick={onClick} className="cursor-pointer">{children}</span>
    )
}

export default LoginButton