import { LoaderCircle, TrashIcon, UserRound, UserRoundPlus, UsersIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Participant } from "@/lib/database.types";
import { getGravatar } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TripCardActionProps } from "./trip-card";

const FormSchema = z.object({
    name: z.string().max(50),
    email: z.string().email(),
});

export function ManageParticipants({ open, plan, setOpen, afterSubmit }: TripCardActionProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {},
    });

    const handleSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
        await axios.post("/api/participants", { ...data, plan_id: plan.id })
            .then(() => {
                form.setValue("name", "");
                form.setValue("email", "");
                afterSubmit && afterSubmit();
            })
            .catch(e => {
                console.error(e);
                toast({
                    title: "Error adding participant!",
                    variant: "destructive",
                    description: e?.response?.data?.error?.message,
                });
            });
    }, [afterSubmit, form, plan.id]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>
                    <UsersIcon className="mr-2 h-4 w-4" />
                    <span>Participants</span>
                </DropdownMenuItem>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Participants</DrawerTitle>
                        <DrawerDescription>Manage the participants for this trip.</DrawerDescription>
                    </DrawerHeader>
                    <ScrollArea className="flex flex-col pb-0 max-h-48">
                        {plan.participants.map((participant, key) => (
                            <ParticipantCard key={key} participant={participant} afterSubmit={afterSubmit} />
                        ))}
                    </ScrollArea>
                    <Form {...form}>
                        <form onSubmit={e => {
                            form.handleSubmit(handleSubmit)(e);
                        }} className="mx-auto w-full max-w-sm">
                            <div className="p-4 py-2 flex gap-2 flex-col pb-0 max-h-80">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Luis Felipe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                            </div>
                            <DrawerFooter>
                                <Button type="submit" disabled={form.formState.isSubmitting} size="lg" className="w-full font-semibold">
                                    {form.formState.isSubmitting ? (
                                        <LoaderCircle className="animate-spin" />
                                    ) : (
                                        <>
                                            <UserRoundPlus className="mr-2" /> Add new participant
                                        </>
                                    )}
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export function ParticipantCard({ participant, afterSubmit }: {
    participant: Participant;
    afterSubmit: TripCardActionProps["afterSubmit"];
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>();
    useEffect(() => {
        getGravatar(participant.email)
            .then(response => response.entry ? response.entry[0] : { thumbnailUrl: undefined })
            .then(gravatar => setImageUrl(gravatar.thumbnailUrl));
    }, [participant.email]);

    const handleDelete = useCallback(async () => {
        setLoading(true);
        await axios.delete("/api/participants", {
            data: { id: participant.id }
        }).then(() => {
            afterSubmit && afterSubmit();
            setDeleted(true);
        }).catch(e => {
            console.error(e);
            toast({
                title: "Error on delete participant!",
                variant: "destructive",
                description: e?.response?.data?.error?.message,
            });
        }).finally(() => setLoading(false));
    }, [afterSubmit, participant.id]);

    return (
        <Card className={`mx-3 my-2 ${deleted && "hidden"}`}>
            <CardHeader className="flex flex-row items-center gap-3 p-3 w-full relative">
                <Avatar>
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback>
                        <UserRound />
                    </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg">{participant.name}</CardTitle>
                    <CardDescription className="text-sm">{participant.email}</CardDescription>
                </div>
                <Button onClick={handleDelete} className="text-destructive absolute right-3" variant={"outline"} size="icon">
                    {loading ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <TrashIcon className="h-4 w-4" />
                    )}
                </Button>
            </CardHeader>
        </Card>
    );
}
