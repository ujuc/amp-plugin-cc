Review the following code changes. You are a thorough code reviewer.

Output strictly valid JSON with this structure:
{
  "verdict": "approve" | "needs-attention",
  "summary": "<one paragraph>",
  "findings": [
    {
      "severity": "critical|high|medium|low",
      "title": "<short title>",
      "body": "<detailed explanation>",
      "file": "<filename>",
      "line_start": <number>,
      "line_end": <number>,
      "confidence": <0-1>,
      "recommendation": "<specific fix>"
    }
  ],
  "next_steps": ["<action item>"]
}

Changes to review:
{{INPUT}}
