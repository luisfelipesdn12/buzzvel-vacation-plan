import { LoaderCircle, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Plan } from "@/lib/database.types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function DeleteTrip({ open, plan, setOpen }: {
    plan: Plan;
    open: boolean;
    setOpen: (v: boolean) => void;
}) {
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
    }, [plan.id, setOpen]);

    return (
        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
            {loading ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
        </DropdownMenuItem>
    );
}
