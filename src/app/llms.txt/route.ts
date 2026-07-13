import { chapters } from "@/content/roadmap";
import { NextResponse } from "next/server";

export async function GET() {
  const title = "# The Behumoury Roadmap — 12 Chapters to AI Engineer\n\n";
  const description = "The full application layer across 5 blocks — free, complete from day one, no signup.\n\n";
  
  let content = title + description;
  
  chapters.forEach((chapter) => {
    content += `## Chapter ${chapter.number}: ${chapter.title}\n`;
    content += `Status: ${chapter.status}\n`;
    content += `${chapter.summary}\n\n`;
    
    chapter.groups.forEach((group) => {
      if (group.label) {
        content += `### ${group.label}\n`;
      }
      group.topics.forEach((topic) => {
        content += `- ${topic.label}\n`;
      });
      content += "\n";
    });
    
    content += "### Interview Questions\n";
    chapter.interviewQuestions.forEach((q) => {
      content += `- ${q}\n`;
    });
    content += "\n---\n\n";
  });
  
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
