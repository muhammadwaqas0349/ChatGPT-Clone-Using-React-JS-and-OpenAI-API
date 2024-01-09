import OpenAI from "openai";

const openai = new OpenAI(
  {  apiKey: "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", 
    dangerouslyAllowBrowser: true
  }
);

export async function sendMessage(input) {
  const completion = await openai.chat.completions.create({

    messages: [{ role: "system", content: input }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}
