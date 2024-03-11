import { LoaderCircle, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { TripCardActionProps } from "./trip-card";

/**
 * Option to edit the plan. Opens a mobile-friedly
 * interface to confirm the operation.
 */
export function DeleteTrip({ open, plan, setOpen, afterSubmit }: TripCardActionProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = useCallback(async () => {
        setLoading(true);
        await axios.delete("/api/plans/", {
            data: { id: plan.id }
        })
            .then(() => {
                toast({
                    title: "Trip deleted!",
                    variant: "default",
                });
                setOpen(false);
                afterSubmit && afterSubmit();
            })
            .catch(e => {
                console.error(e);
                toast({
                    title: "Error deleting trip!",
                    variant: "destructive",
                    description: e?.response?.data?.error?.message,
                });
            })
            .finally(() => setLoading(false));
    }, [afterSubmit, plan.id, setOpen]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <DropdownMenuItem className="text-destructive" onSelect={e => e.preventDefault()}>
                    <TrashIcon className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button
                        onClick={handleDelete}
                        variant={"destructive"}
                        className="w-full font-semibold"
                        disabled={loading}
                    >
                        {loading ? (
                            <LoaderCircle className="animate-spin" />
                        ) : "Delete"}
                    </Button>
                    <DrawerClose>
                        <Button className="w-full" variant={"secondary"}>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
