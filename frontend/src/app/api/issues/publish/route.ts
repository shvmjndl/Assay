import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { publishIssue, type PublishPayload } from "@/lib/issue-store";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: "Sign in to publish an Assay issue." },
      { status: 401 },
    );
  }

  let body: PublishPayload;
  try {
    body = (await request.json()) as PublishPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const issue = await publishIssue(body, {
      id: (session.user as { id?: string }).id,
      email: session.user.email,
      name: session.user.name,
    });
    return NextResponse.json({ issue }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not publish issue.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
