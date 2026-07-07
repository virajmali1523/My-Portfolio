import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, mission } = await request.json();

    if (!name || !email || !mission) {
      return NextResponse.json(
        { error: "Required fields are missing: name, email, and mission must be provided." },
        { status: 400 }
      );
    }

    console.log("=== [PORTFOLIO INBOX RECEIVER] ===");
    console.log(`From: ${name} <${email}>`);
    console.log(`Message payload: ${mission}`);
    console.log("==================================");

    // Send email using Resend
    // Note: onboarding@resend.dev is the default sending address that works instantly.
    // It will deliver emails to your registered email address (virajmali222@gmail.com).
    await resend.emails.send({
      from: "Portfolio Lead <onboarding@resend.dev>",
      to: "virajmali222@gmail.com",
      subject: `🚀 New Message from ${name}`,
      text: `Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${mission}`,
    });

    return NextResponse.json({ success: true, message: "Transmission successfully recorded." });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while routing transmission." },
      { status: 500 }
    );
  }
}
