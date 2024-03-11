import { Database, ParticipantInsert } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(request: NextRequest) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({
            error: { message: "User not signed in" },
            participants: []
        }, { status: 401 });
    }

    const body: ParticipantInsert = await request.json();

    const newParticipant: ParticipantInsert = {
        ...body,
        id: uuid(),
    };

    let { data: participant, error } = await supabase
        .from("participants")
        .insert(newParticipant)
        .select();

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ participant });
}

export async function DELETE(request: NextRequest) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({
            error: { message: "User not signed in" },
            participants: []
        }, { status: 401 });
    }

    const id = (await request.json())?.id;

    if (!id) {
        return NextResponse.json({
            error: { message: "No `id` found." },
            participants: []
        }, { status: 401 });
    }

    let { error } = await supabase
        .from("participants")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ deleted: true });
}
