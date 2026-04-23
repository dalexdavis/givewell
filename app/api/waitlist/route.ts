import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Storage abstraction — uses Upstash Redis when env vars are present,
// falls back to in-memory (dev only, resets on cold start).
// ---------------------------------------------------------------------------

let memoryStore: string[] = [];

async function getRedis() {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        return null;
    }
    const { Redis } = await import("@upstash/redis");
    return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
}

async function loadEmails(): Promise<string[]> {
    const redis = await getRedis();
    if (redis) {
        const data = await redis.get<string[]>("waitlist");
        return data ?? [];
    }
    return memoryStore;
}

async function saveEmails(emails: string[]): Promise<void> {
    const redis = await getRedis();
    if (redis) {
        await redis.set("waitlist", emails);
    } else {
        memoryStore = emails;
    }
}

// ---------------------------------------------------------------------------

export async function GET() {
    const emails = await loadEmails();
    return NextResponse.json({ count: emails.length });
}

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const emails = await loadEmails();

    if (emails.includes(email)) {
        return NextResponse.json({ error: "Already registered" }, { status: 409 });
    }

    emails.push(email);
    await saveEmails(emails);

    return NextResponse.json({ success: true });
}
