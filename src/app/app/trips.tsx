import { SessionProviderPageProps } from "@/components/SessionProvider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { useState } from "react"

export default function Trips(props: SessionProviderPageProps) {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <section className="flex flex-col items-start justify-center w-full gap-5 text-center">
      <h1 className="text-4xl font-bold">
        Your next trips...
      </h1>
      <ul className="flex flex-wrap gap-4">
        {[1,2,3,4,5,6,7,8].map((trip, key) => (
          <Card key={key} className="text-left w-96">
            <CardHeader>
              <CardTitle>{trip}ts Trip</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-wrap gap-2">
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal pointer-events-none",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Loading date...</span>}
              </Button>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal pointer-events-none",
                  !date && "text-muted-foreground"
                )}
              >
                <MapPinIcon className="mr-2 h-4 w-4" />
                {"São Paulo"}
              </Button>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal pointer-events-none",
                  !date && "text-muted-foreground"
                )}
              >
                <UsersIcon className="mr-2 h-4 w-4" />
                {"2 participantes"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </section>
  );
}
