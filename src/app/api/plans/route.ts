import { Database, Participant, Plan, PlanInsert, PlanUpdate } from '@/lib/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from "uuid";

export async function GET(request: NextRequest) {
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

export async function POST(request: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({
            error: { message: "User not signed in" },
            plans: []
        }, { status: 401 });
    }

    const body: PlanInsert = await request.json();

    const newPlan: PlanInsert = {
        ...body,
        id: uuid(),
        user_id: user.id,
    };

    let { data: plan, error } = await supabase
        .from("plans")
        .insert(newPlan)
        .select();

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ plan });
}

export async function PUT(request: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({
            error: { message: "User not signed in" },
            plans: []
        }, { status: 401 });
    }

    const body: PlanUpdate = await request.json();

    if (!body.id) {
        return NextResponse.json({
            error: { message: "No `id` found." },
            plans: []
        }, { status: 401 });
    }

    let { data: plan, error } = await supabase
        .from("plans")
        .update({
            title: body.title,
            description: body.description,
            date: body.date,
            location: body.location,
        })
        .eq('id', body.id)
        .eq('user_id', user.id)
        .select();

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ plan });
}

export async function DELETE(request: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({
            error: { message: "User not signed in" },
            plans: []
        }, { status: 401 });
    }

    const id = (await request.json())?.id;

    if (!id) {
        return NextResponse.json({
            error: { message: "No `id` found." },
            plans: []
        }, { status: 401 });
    }

    let { error } = await supabase
        .from("plans")
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ deleted: true });
}

