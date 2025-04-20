import OpenAI from "openai";
import { correctionResponseSchema, type CorrectionResponse } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "" 
});

export async function correctText(text: string): Promise<CorrectionResponse> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY não foi configurada. Configure a variável de ambiente.");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um assistente especializado em correção de texto em português.
          Analise o texto fornecido pelo usuário e corrija quaisquer erros de ortografia, gramática, 
          pontuação ou estilo. Retorne o texto corrigido e uma lista de explicações sobre as correções feitas.
          
          Responda exclusivamente no seguinte formato JSON:
          {
            "correctedText": "texto corrigido",
            "explanations": ["explicação 1", "explicação 2", ...]
          }
          
          Se o texto estiver perfeito, retorne o texto original e uma explicação indicando que não foram necessárias correções.`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Validate with zod schema
    return correctionResponseSchema.parse({
      correctedText: result.correctedText || text,
      explanations: result.explanations || ["Não foi possível analisar o texto."]
    });
    
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error(`Falha ao chamar a API do OpenAI: ${error instanceof Error ? error.message : String(error)}`);
  }
}
