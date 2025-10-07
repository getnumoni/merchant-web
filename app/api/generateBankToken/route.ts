import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  // Ensure only POST method is allowed
  if (request.method !== 'POST') {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  try {
    // Get bank credentials from environment variables
    const secret = process.env.BANK_SECRET_KEY;
    const clientId = process.env.BANK_CLIENT_ID;
    const bankUrl = process.env.BANK_URL;

    if (!secret || !clientId || !bankUrl) {
      return NextResponse.json(
        { error: " credentials not configured" },
        { status: 500 }
      );
    }

    // Make request to bank API
    const response = await fetch(`${bankUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret,
        clientId
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to generate bank token" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Bank token generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}