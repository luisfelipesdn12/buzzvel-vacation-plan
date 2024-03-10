import { Database, Participant, Plan } from '@/lib/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({
            error: { message: "User not signed in" },
            plans: []
        }, { status: 401 });
    }

    let { data: plans }: {
        data: Plan[] | null,
    } = await supabase
        .from("plans")
        .select()
        .eq('user_id', user.id);

    if (!plans) plans = [];

    for (let i = 0; i < plans.length; i++) {
        let { data: participants }: {
            data: Participant[] | null,
        } = await supabase
            .from("participants")
            .select()
            .eq('plan_id', plans[i].id);

        plans[i].participants = participants || [];
    }

    return NextResponse.json({ plans });
}

export default GET;
