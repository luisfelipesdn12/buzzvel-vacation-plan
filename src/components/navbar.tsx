"use client"

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ModeToggle } from "./ui/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

interface Link {
    label: string;
    pathname: string;
    target?: string;
}

const links: Link[] = [
    {
        label: "Author",
        pathname: "https://luisf.dev",
        target: "_blank",
    },
];

export default function Navbar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 py-1 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold sm:inline-block">
                            Vacation Planner
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        {links.map((link, key) => (
                            <Link
                                key={key}
                                href={link.pathname}
                                target={link.target}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === link.pathname ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <svg
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                            >
                                <path
                                    d="M3 5H11"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M3 12H16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M3 19H21"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <MobileLink
                            href="/"
                            className="flex items-center"
                            onOpenChange={setOpen}
                        >
                            <span className="font-bold">Vacation Planner</span>
                        </MobileLink>
                        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                            <div className="flex flex-col space-y-3">
                                {links.map((link, key) => (
                                    <MobileLink
                                        key={key}
                                        href={link.pathname}
                                        target={link.target}
                                        onOpenChange={setOpen}
                                    >
                                        {link.label}
                                    </MobileLink>
                                ))}
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 gap-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        <ModeToggle />
                    </nav>
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <Button>Login</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
    target?: string
}

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString())
                onOpenChange?.(false)
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </Link>
    )
}
