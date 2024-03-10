import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Plan } from "@/lib/database.types"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, EllipsisIcon, EyeIcon, MapPinIcon, PencilIcon, TrashIcon, UsersIcon } from "lucide-react"

export default function TripCard({ plan }: { plan: Plan }) {
    return (
        <Card className="text-left w-96">
            <CardHeader className="relative">
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline" className="absolute right-6">
                            <EllipsisIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <EyeIcon className="mr-2 h-4 w-4" />
                            <span>View more</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardFooter className="flex flex-wrap gap-2">
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal pointer-events-none",
                        !plan.date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {plan.date ? format(plan.date, "PPP") : <span>Loading date...</span>}
                </Button>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal pointer-events-none",
                        !plan.location && "text-muted-foreground"
                    )}
                >
                    <MapPinIcon className="mr-2 h-4 w-4" />
                    {plan.location}
                </Button>
                {plan.participants.length > 0 && <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal pointer-events-none",
                        !plan.participants && "text-muted-foreground"
                    )}
                >
                    <UsersIcon className="mr-2 h-4 w-4" />
                    {`${plan.participants.length} participants`}
                </Button>}
            </CardFooter>
        </Card>
    );
}

export function TripCardSkeleton() {
    return (
        <Card className="text-left w-96">
            <CardHeader>
                <Skeleton className="h-7 w-52" />
                <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardFooter className="flex flex-wrap gap-2">
                <Skeleton className="h-9 w-40" />
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-36" />
            </CardFooter>
        </Card>
    );
}
