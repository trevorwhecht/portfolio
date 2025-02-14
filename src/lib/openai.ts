import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN || "",
  defaultHeaders: {
    "x-ms-model-mesh-model-name": "gpt-4o", // Adding the model name in headers
  },
})

export { client }