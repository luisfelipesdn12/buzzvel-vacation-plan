import { Session, SupabaseClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";
import { redirect } from "next/navigation";
import { Gravatar, getGravatar } from "@/lib/utils";

export type SessionProviderPageProps = {
    session?: Session | null;
    gravatar?: Gravatar;
}

interface SessionProviderProps {
    redirectIfSession?: string;
    redirectIfNotSession?: string;
    page: React.FC<SessionProviderPageProps>;
}

/**
 * SessionProvider is used to perform server-side operations
 * and provide the user data if it is logged in. Also, fetches
 * public data from Gravatar using user email.
 */
export default async function SessionProvider({
    page: PageComponent,
    redirectIfSession,
    redirectIfNotSession,
}: SessionProviderProps) {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (redirectIfSession && session) {
        redirect(redirectIfSession);
    }

    if (redirectIfNotSession && !session) {
        redirect(redirectIfNotSession);
    }

    let gravatar: Gravatar | undefined = undefined;

    if (session?.user?.email) {
        const response = await getGravatar(session.user.email);
        gravatar = response?.entry?.[0];
    }

    return <PageComponent
        session={session}
        gravatar={gravatar}
    />;
}
