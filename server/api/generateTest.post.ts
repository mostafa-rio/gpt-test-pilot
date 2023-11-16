import { GenerateTestParams, TypeOfTest } from "~/types";

export default defineEventHandler(async (e) => {
  try {
    const {
      apiKey,
      code: codeToTest,
      instructions,
      type,
      technologies,
    } = await readBody<GenerateTestParams>(e);
    console.log(makeSystemPrompt(type, technologies, instructions));
    const requestBody: CompletionRequest = {
      model: "gpt-3.5-turbo-16k",
      max_tokens: 4097,
      messages: [
        {
          role: "system",
          content: makeSystemPrompt(type, technologies, instructions),
        },
        {
          role: "user",
          content: codeToTest,
        },
      ],
    };

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });
    let json = await resp.json();
    return {
      success: true,
      body: json.choices[0],
    };
  } catch (err) {
    console.log(err);
    throw createError({
      statusCode: 500,
      statusMessage:
        "Something went wrong. Please open an issue if you think its a bug",
    });
  }
});

const makeSystemPrompt = (
  typeOfTest: TypeOfTest,
  technologies: string,
  instructions?: string
) => `I want you to be my code test agent. You should be able to understand and generate test code in the programming language(s) that the input code is written in.
Write ${typeOfTest} tests for the code that I give you.
Write the tests using ${technologies} that cover all aspects of the code, including edge cases and unexpected inputs. Tests must be efficient and easy to read.
Just return the test code with no explanation and no notes.
${
  instructions
    ? "Also, consider these explanations of my code to help you understand the code and generate the tests: " +
      instructions
    : ""
}`;

type MessageContent =
  | string
  | (string | { type: "image_url"; image_url: string })[];
export type CompletionRequest = {
  model: "gpt-3.5-turbo-16k";
  messages: {
    role: "system" | "user" | "assistant" | "function";
    content: MessageContent;
    name?: string | undefined;
  }[];
  functions?: any[] | undefined;
  function_call?: any | undefined;
  stream?: boolean | undefined;
  temperature?: number | undefined;
  top_p?: number | undefined;
  max_tokens?: number | undefined;
  n?: number | undefined;
  best_of?: number | undefined;
  frequency_penalty?: number | undefined;
  presence_penalty?: number | undefined;
  logit_bias?:
    | {
        [x: string]: number;
      }
    | undefined;
  stop?: (string[] | string) | undefined;
};
