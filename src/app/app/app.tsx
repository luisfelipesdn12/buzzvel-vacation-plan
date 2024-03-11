"use client";

import { SessionProviderPageProps } from "@/components/SessionProvider";
import Navbar from "@/components/navbar";
import { useMemo } from "react";
import Trips from "./trips";
import { Separator } from "@/components/ui/separator";
import Camping from "@/icons/Camping";

export default function App(props: SessionProviderPageProps) {
    const salute = useMemo(() =>
        props.gravatar?.displayName ?
            `Hello, ${props.gravatar?.displayName}!` :
            "Hello!",
    [props.gravatar?.displayName]);

    return (
        <>
            <Navbar {...props} />
            <main className="flex flex-col p-16 py-12 items-start justify-center gap-1 text-center">
                <header className="flex flex-col items-center md:flex-row md:items-end justify-center w-full gap-4 md:gap-1 text-center">
                    <Camping className="w-80 h-40" />
                    <div className="flex flex-col items-center md:items-end justify-center w-full gap-1 text-center">
                        <h1 className="text-3xl font-bold">
                            {salute}
                        </h1>
                        <p className="text-muted-foreground text-center md:text-right">
                            {"\"We could vacay, there's places to go\""}
                            <br />
                            <p className="text-sm">
                                — Frank Ocean in White Ferrari
                            </p>
                        </p>
                    </div>
                </header>
                <Separator className="my-4 opacity-0" />
                <Trips {...props} />
            </main>
        </>
    );
}
