import { apiRequest } from "./queryClient";

export interface CorrectionResult {
  correctedText: string;
  explanations: string[];
}

export async function correctText(text: string): Promise<CorrectionResult> {
  try {
    const response = await apiRequest("POST", "/api/correct", { text });
    const data = await response.json();
    
    return {
      correctedText: data.correctedText,
      explanations: data.explanations
    };
  } catch (error) {
    throw new Error(`Failed to correct text: ${error instanceof Error ? error.message : String(error)}`);
  }
}
