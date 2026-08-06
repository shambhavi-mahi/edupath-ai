import { NextRequest, NextResponse } from "next/server";
import { generatePathBotResponse } from "@/lib/ai/pathbot";
import { UserProfile } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { message, history, profile } = await req.json();

    const result = await generatePathBotResponse(message, {
      messages: history || [],
      profile: (profile as Partial<UserProfile>) || {},
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        content: "Let me connect you to our full assessment tool for a more personalised answer. [Start Assessment](/assessment)",
        quickReplies: ["Start Brain Assessment", "Show entrance exams", "Find colleges"],
      },
      { status: 200 }
    );
  }
}
