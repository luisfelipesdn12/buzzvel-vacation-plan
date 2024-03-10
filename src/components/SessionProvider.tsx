import { Session, SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'
import { redirect } from 'next/navigation'
import { getGravatar } from '@/lib/utils'

export interface Gravatar {
    hash: string
    requestHash: string
    profileUrl: string
    preferredUsername: string
    thumbnailUrl: string
    photos: {
        value: string
        type: string
    }[];
    last_profile_edit: string
    displayName: string
    name: {
        givenName: string
        familyName: string
        formatted: string
    }
    urls: {
        title: string
        value: string
    }[];
}

export type SessionProviderPageProps = {
    session?: Session | null;
    gravatar?: Gravatar;
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

    let gravatar: Gravatar | undefined = undefined;

    if (session?.user?.email) {
        const response = await getGravatar(session.user.email);
        gravatar = response?.entry?.[0];
    }

    return <PageComponent
        session={session}
        gravatar={gravatar}
    />
}
