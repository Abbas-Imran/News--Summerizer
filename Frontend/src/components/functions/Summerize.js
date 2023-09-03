import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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", // This is also the default, can be omitted
});

const Summerize = async (prompt) => {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello!" }],
  });
  console.log(chatCompletion.choices[0].message);
};

export default Summerize;