import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { correctText } from "./correction-service";
import { correctionResponseSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Text correction API endpoint
  app.post("/api/correct", async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== "string") {
        return res.status(400).json({ 
          message: "Texto é obrigatório e deve ser uma string" 
        });
      }

      const result = await correctText(text);
      
      // Validate response against schema
      const validatedResponse = correctionResponseSchema.parse(result);
      
      return res.json(validatedResponse);
    } catch (error) {
      console.error("Error correcting text:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Erro ao corrigir texto"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
