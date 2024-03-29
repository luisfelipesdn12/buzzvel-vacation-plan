"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Database } from "@/lib/database.types";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, RectangleEllipsis } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "@/components/navbar";

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters."
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

/**
 * The form for register in the platform. Uses `zod` and `useForm`
 * to handle the data. Creates a new user in Supabase Auth Server.
 */
export default function RegisterForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    const handleSignUp = async (data: z.infer<typeof FormSchema>) => {
        const response = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (response.error) {
            toast({
                title: "Register error",
                variant: "destructive",
                description: response.error.message,
            });
            console.error(response);
        } else {
            router.refresh();
        }
    };

    return (
        <>
            <Navbar />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSignUp)} className="flex flex-col py-20 items-center justify-center gap-4">
                    <div className="flex w-72 flex-col items-center justify-center gap-4">
                        <RectangleEllipsis size="2rem" />
                        <h1 className="text-3xl font-semibold">
                            Register
                        </h1>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="hireme@luisf.dev" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            size={"lg"}
                            type="submit"
                            className="w-full font-semibold"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <LoaderCircle className="animate-spin" />
                            ) : "Sign up"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
