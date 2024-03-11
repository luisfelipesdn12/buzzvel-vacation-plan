import { CalendarIcon, LoaderCircle, MapPinIcon, PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useEffect, useState } from "react";

const FormSchema = z.object({
    title: z.string().max(20),
    description: z.string().max(120),
    date: z.date(),
    location: z.string().max(50),
    participants: z.array(z.object({
        name: z.string().max(50),
        email: z.string().email(),
    })).optional(),
});

/**
 * Option to add a new plan. Opens a mobile-friedly
 * interface to insert the data.
 */
export function AddTrip({open, setOpen}: {
    open: boolean;
    setOpen: (v: boolean) => void;
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {},
    });

    const handleSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
        await axios.post("/api/plans", data)
            .then(() => {
                toast({
                    title: "Trip created!",
                    variant: "default",
                });
                setOpen(false);
            })
            .catch(e => {
                console.error(e);
                toast({
                    title: "Error creating trip!",
                    variant: "destructive",
                    description: e?.response?.data?.error?.message,
                });
            });
    }, [setOpen]);

    useEffect(() => form.reset(), [form, open]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full mt-3 md:w-auto">
                    <PlusCircleIcon className="mr-2" /> Add new trip plan
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Create a new plan</DrawerTitle>
                            <DrawerDescription>Insert the informations of your planned trip.</DrawerDescription>
                        </DrawerHeader>
                        <ScrollArea className="p-4 pt-0 flex flex-col pb-0 max-h-80">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="w-full my-2 px-1">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="My Exploring in Lisboa" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="w-full my-2 px-1">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none"
                                                placeholder="I'm sure we're taller in another dimension. You say we're small and not worth the mention..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="w-full my-2 px-1">
                                        <FormLabel>Date</FormLabel>
                                        <br />
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem className="w-full my-2 px-1">
                                        <FormLabel>Location</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input placeholder="Lisboa, Portugal" {...field} />
                                            </FormControl>
                                            <MapPinIcon className="ml-auto h-4 w-4 opacity-50 absolute top-3 right-4" />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </ScrollArea>
                        <DrawerFooter>
                            <Button
                                size={"lg"}
                                type="submit"
                                className="w-full font-semibold"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <LoaderCircle className="animate-spin" />
                                ) : "Create"}
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    );
}
