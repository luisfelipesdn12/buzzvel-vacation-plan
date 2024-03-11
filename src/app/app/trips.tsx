import { SessionProviderPageProps } from "@/components/SessionProvider";
import { Plan } from "@/lib/database.types";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddTrip } from "./add-trip";
import TripCard, { TripCardSkeleton } from "./trip-card";

/**
 * List of user trips.
 */
export default function Trips(props: SessionProviderPageProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [openAddTrip, setOpenAddTrip] = useState<boolean>(false);

    const fetchTrips = async () => axios.get("/api/plans")
        .then(res => res.data.plans)
        .then(setPlans)
        .finally(() => setLoading(false));

    useEffect(() => {
        fetchTrips();
    }, [openAddTrip]);

    return (
        <section className="flex flex-col items-start justify-center w-full gap-5 text-center">
            <div className="flex flex-col md:flex-row items-start justify-center w-full gap-1">
                <div className="flex flex-col items-start justify-center w-full gap-1">
                    <h1 className="text-4xl font-bold">
            Your trips!
                    </h1>
                    <p className="text-muted-foreground text-right">
                        {loading ? "Loading your trips..." : plans.length > 0 ? `You have ${plans.length} trip${plans.length > 1 ? "s" : ""}...` : "You don't have any trips yet..."}
                    </p>
                </div>
                <AddTrip open={openAddTrip} setOpen={setOpenAddTrip} />
            </div>
            <ul className="flex flex-wrap gap-4 w-full">
                {loading ? Array.from(Array(3).keys()).map((key) => (
                    <TripCardSkeleton key={key} />
                )) : plans.length > 0 ? plans.map((plan, key) => (
                    <TripCard key={key} plan={plan} onAfterAction={() => fetchTrips()} />
                )) : (
                    <p className="text-muted-foreground text-right">
            There are no trips yet...
                    </p>
                )}
            </ul>
        </section>
    );
}
