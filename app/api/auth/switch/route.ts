import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DEMO_USERS } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    const user = Object.values(DEMO_USERS).find((u) => u.id === userId);

    if (!user) {
      return NextResponse.json({ error: "Invalid demo user id" }, { status: 400 });
    }

    const cookieStore = cookies();
    cookieStore.set("hp_active_user", user.id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
