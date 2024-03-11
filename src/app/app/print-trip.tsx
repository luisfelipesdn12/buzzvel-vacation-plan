import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { generatePlanPdf } from "@/lib/utils";
import { FileDownIcon } from "lucide-react";
import { TripCardActionProps } from "./trip-card";

export function PrintTrip({ plan }: Pick<TripCardActionProps, "plan">) {
    return (
        <DropdownMenuItem onClick={() => generatePlanPdf(plan)}>
            <FileDownIcon className="mr-2 h-4 w-4" />
            <span>Download PDF</span>
        </DropdownMenuItem>
    );
}
