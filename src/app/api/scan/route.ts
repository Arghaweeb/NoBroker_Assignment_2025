import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  imageBase64: z.string().min(10),
});

const ingredientsSchema = z.object({
  ingredients: z.array(z.string().min(1)),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64 } = requestSchema.parse(body);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

    const prompt = `
You are a vision assistant who identifies food items from fridge/pantry photos.
Return ONLY a JSON object:
{"ingredients":["milk","eggs","tomato"]}

- No explanations
- No extra text
- Only ingredient names
`.trim();

    const resp = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: prompt },
            {
              role: "user",
              content: [
                { type: "text", text: "Detect food items in this image." },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`,
                  },
                },
              ],
            },
          ],
          temperature: 0.1,
        }),
      }
    );

    if (!resp.ok) {
      const t = await resp.text();
      throw new Error("OpenAI error: " + t);
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || "";

    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start === -1 || end === -1) {
      throw new Error("No JSON in model response");
    }

    const json = JSON.parse(content.slice(start, end + 1));
    const validated = ingredientsSchema.parse(json);

    return NextResponse.json(validated, { status: 200 });
  } catch (err: any) {
    console.error("SCAN ROUTE ERROR:", err);
    return NextResponse.json(
      { error: err?.message || "Scan failed" },
      { status: 500 }
    );
  }
}
