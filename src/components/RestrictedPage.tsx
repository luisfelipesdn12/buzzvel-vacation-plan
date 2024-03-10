import { Session, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'
import { redirect } from 'next/navigation'

export type SessionProviderPageProps = {
    session?: Session | null,
}

interface SessionProviderProps {
    redirectIfSession?: string;
    redirectIfNotSession?: string;
    page: React.FC<SessionProviderPageProps>;
}

export default async function SessionProvider({
    page: PageComponent,
    redirectIfSession,
    redirectIfNotSession,
}: SessionProviderProps) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (redirectIfSession && session) {
        redirect(redirectIfSession);
    }
    
    if (redirectIfNotSession && !session) {
        redirect(redirectIfNotSession);
    }

    return <PageComponent session={session} />
}
