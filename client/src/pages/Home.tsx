import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { DiffText } from "@/components/ui/diff-text";

interface CorrectionResponse {
  correctedText: string;
  explanations: string[];
}

export default function Home() {
  const [text, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const { toast } = useToast();

  const correction = useMutation({
    mutationFn: async (textToCorrect: string) => {
      const response = await apiRequest("POST", "/api/correct", { text: textToCorrect });
      const data = await response.json();
      return data as CorrectionResponse;
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Houve um problema ao processar seu texto: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCharacterCount(newText.length);
  };

  const handleClearText = () => {
    setText("");
    setCharacterCount(0);
  };

  const handlePasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setCharacterCount(clipboardText.length);
    } catch (error) {
      toast({
        title: "Erro ao colar",
        description: "Não foi possível acessar a área de transferência. Verifique as permissões do seu navegador.",
        variant: "destructive",
      });
    }
  };

  const handleCorrectText = () => {
    if (!text.trim()) {
      toast({
        title: "Entrada inválida",
        description: "Por favor, digite algum texto para corrigir.",
        variant: "destructive",
      });
      return;
    }
    correction.mutate(text);
  };

  const handleCopyText = () => {
    if (!correction.data?.correctedText) return;
    
    navigator.clipboard.writeText(correction.data.correctedText)
      .then(() => {
        toast({
          title: "Texto copiado!",
          description: "O texto corrigido foi copiado para a área de transferência.",
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao copiar",
          description: `Não foi possível copiar o texto: ${error.message}`,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex flex-col min-h-screen px-4 py-8 md:py-16 md:px-6 lg:px-8 max-w-3xl mx-auto bg-background text-foreground">
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <i className="fas fa-pen-fancy text-xl"></i>
          </div>
          <h1 className="text-2xl font-bold">Corretor de Texto</h1>
        </div>
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          Digite seu texto abaixo e obtenha uma versão corrigida com IA.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="space-y-4">
          <div>
            <label htmlFor="text-input" className="block mb-2 text-sm font-medium">
              Texto Original
            </label>
            <div className="relative">
              <Textarea 
                id="text-input" 
                value={text}
                onChange={handleTextChange}
                placeholder="Digite ou cole seu texto aqui para corrigir..."
                className="min-h-[120px] resize-y text-sm md:text-base"
                rows={5}
              />
              <button 
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" 
                onClick={handleClearText}
                aria-label="Limpar texto"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">{characterCount} caracteres</span>
              <button 
                className="text-xs text-primary hover:text-primary-dark flex items-center gap-1"
                onClick={handlePasteText}
              >
                <i className="fas fa-paste"></i>
                <span>Colar</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button 
              className="flex-1 py-3 items-center justify-center gap-2"
              onClick={handleCorrectText}
              disabled={!text.trim() || correction.isPending}
            >
              <i className="fas fa-magic"></i>
              <span>Corrigir Texto</span>
            </Button>
          </div>
        </div>

        {/* Loading Indicator */}
        {correction.isPending && (
          <div className="mt-8">
            <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary animate-pulse"></div>
                <p className="text-muted-foreground">Analisando e corrigindo seu texto...</p>
              </div>
            </div>
          </div>
        )}

        {/* Result Section */}
        {correction.data && !correction.isPending && (
          <div className="mt-8">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="corrected-text" className="block text-sm font-medium">
                    Texto Corrigido
                  </label>
                  <button 
                    className="text-xs text-primary hover:text-primary-dark flex items-center gap-1"
                    onClick={handleCopyText}
                  >
                    <i className="fas fa-copy"></i>
                    <span>Copiar</span>
                  </button>
                </div>
                <Card className="p-4 min-h-[120px] text-sm md:text-base overflow-auto">
                  <div className="whitespace-pre-wrap">
                    <DiffText originalText={text} correctedText={correction.data.correctedText} />
                  </div>
                </Card>
              </div>

              {/* Explanations Section */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">O que foi corrigido:</h3>
                <Card className="p-4">
                  <ul className="text-sm space-y-2 list-disc pl-5">
                    {correction.data.explanations.map((explanation, index) => (
                      <li key={index}>{explanation}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-xs text-muted-foreground">
          © 2024 Corretor de Texto - Powered by OpenAI GPT
        </p>
      </footer>
    </div>
  );
}
