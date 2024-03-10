"use client"

import { SessionProviderPageProps } from "@/components/SessionProvider";
import Navbar from "@/components/navbar";
import { useMemo } from "react";
import Trips from "./trips";
import { Separator } from "@/components/ui/separator";

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
                <header className="flex flex-col items-end justify-center w-full gap-1 text-center">
                    <h1 className="text-3xl font-bold">
                        {salute}
                    </h1>
                    <p className="text-muted-foreground text-right">
                        {`"We could vacay, there's places to go"`}
                        <br />
                        <p className="text-sm">
                            — Frank Ocean in White Ferrari
                        </p>
                    </p>
                </header>
                <Separator className="my-4 opacity-0" />
                <Trips {...props} />
            </main>
        </>
    );
}
