import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "waitlist.json");

function loadEmails(): string[] {
    if (!fs.existsSync(FILE_PATH)) return [];
    try {
        return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    } catch {
        return [];
    }
}

export async function GET() {
    const emails = loadEmails();
    return NextResponse.json({ count: emails.length });
}

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const emails = loadEmails();

    if (emails.includes(email)) {
        return NextResponse.json({ error: "Already registered" }, { status: 409 });
    }

    emails.push(email);
    fs.writeFileSync(FILE_PATH, JSON.stringify(emails, null, 2));

    return NextResponse.json({ success: true });
}
