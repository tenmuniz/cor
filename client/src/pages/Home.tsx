import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { NeuCard } from "@/components/ui/neu-card";
import { Button3d } from "@/components/ui/button-3d";
import { PulseButton } from "@/components/ui/pulse-button";
import { DiffText } from "@/components/ui/diff-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  LogoIcon, 
  WhatsAppIcon, 
  EnhanceIcon, 
  CheckIcon 
} from "@/components/ui/logo-icon";
import { PencilIcon } from "@/components/ui/pencil-icon";

interface CorrectionResponse {
  correctedText: string;
  enhancedText: string;
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

  const handleCopyText = (textToCopy: string) => {
    if (!textToCopy) return;
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast({
          title: "Texto copiado!",
          description: "O texto foi copiado para a área de transferência.",
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
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header with banner image, logo and title */}
      <header className="pt-8 pb-4 px-4 relative">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-6 relative">
            <div className="mb-2 w-24 h-24 animate-pulse-slow glow-effect">
              <LogoIcon className="text-[#2DD4BF]" />
            </div>
            <h1 className="text-4xl font-bold text-[#2DD4BF] mb-3">CorrijaMuniz</h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md">
              Cole seu texto do WhatsApp e receba correções e sugestões melhoradas do Muniz
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Input Section */}
          <NeuCard elevated className="p-6 mb-8 transform transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <WhatsAppIcon />
              <h2 className="font-semibold">Seu texto do WhatsApp</h2>
            </div>
            
            <div className="relative">
              <Textarea 
                value={text}
                onChange={handleTextChange}
                placeholder="Passa a correção..."
                className="min-h-[120px] resize-y bg-white/90 backdrop-blur-md border-primary/10 rounded-xl shadow-inner focus:border-primary/30 focus:ring-primary/30 text-sm md:text-base"
                rows={5}
              />
              <button 
                className="absolute right-3 top-3 text-red-400 hover:text-red-600 dark:hover:text-red-300" 
                onClick={handleClearText}
                aria-label="Limpar texto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m15 9-6 6"/>
                  <path d="m9 9 6 6"/>
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">{characterCount} caracteres</span>
              <button 
                className="text-xs text-primary hover:text-primary-dark flex items-center gap-1"
                onClick={handlePasteText}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/>
                </svg>
                <span>Colar</span>
              </button>
            </div>

            <div className="mt-6">
              <Button3d
                className="w-full py-3 text-base font-medium"
                onClick={handleCorrectText}
                disabled={!text.trim() || correction.isPending}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <path d="M12 9v4"/>
                  <path d="M12 17h.01"/>
                </svg>
                Corrigir Texto
              </Button3d>
            </div>
          </NeuCard>

          {/* Loading Indicator */}
          {correction.isPending && (
            <div className="flex justify-center my-8">
              <div className="p-4 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary animate-pulse"></div>
                <p className="text-muted-foreground animate-pulse">Analisando e aprimorando seu texto...</p>
              </div>
            </div>
          )}

          {/* Result Sections */}
          {correction.data && !correction.isPending && (
            <div className="space-y-8">
              {/* Corrected Text Section */}
              {/* Comparison View (Diff) */}
              <div className="relative overflow-visible">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-1 w-40 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded"></div>
                <NeuCard elevated className="p-6 transform transition-all duration-300 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text-primary">
                        <PencilIcon />
                      </div>
                      <h2 className="font-semibold">Comparação</h2>
                    </div>
                    <PulseButton
                      variant="success"
                      size="sm"
                      className="px-3 py-1.5 text-xs font-medium"
                      onClick={() => handleCopyText(correction.data.correctedText)}
                      pulseColor="rgba(16, 185, 129, 0.2)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                      Copiar Correto
                    </PulseButton>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-primary/10">
                    <DiffText originalText={text} correctedText={correction.data.correctedText} />
                  </div>
                </NeuCard>
              </div>

              {/* Corrected Text Section */}
              <div className="relative overflow-visible">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-1 w-40 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded"></div>
                <NeuCard elevated className="p-6 transform transition-all duration-300 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text-primary">
                        <CheckIcon />
                      </div>
                      <h2 className="font-semibold">Texto Corrigido</h2>
                    </div>
                    <PulseButton
                      variant="success"
                      size="sm"
                      className="px-3 py-1.5 text-xs font-medium"
                      onClick={() => handleCopyText(correction.data.correctedText)}
                      pulseColor="rgba(16, 185, 129, 0.2)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                      Copiar
                    </PulseButton>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-primary/10 min-h-[80px]">
                    <p className="text-sm md:text-base whitespace-pre-wrap">{correction.data.correctedText}</p>
                  </div>
                </NeuCard>
              </div>

              {/* Enhanced Text Section */}
              <div className="relative overflow-visible">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-1 w-40 bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded"></div>
                <NeuCard elevated className="p-6 transform transition-all duration-300 rounded-2xl" border>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text-accent">
                        <EnhanceIcon />
                      </div>
                      <h2 className="font-semibold">Versão Aprimorada</h2>
                    </div>
                    <PulseButton
                      variant="outline"
                      size="sm"
                      className="px-3 py-1.5 text-xs font-medium border-accent/30 text-accent hover:text-accent-foreground"
                      onClick={() => handleCopyText(correction.data.enhancedText)}
                      pulseColor="rgba(124, 58, 237, 0.2)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                      Copiar
                    </PulseButton>
                  </div>
                  <div className="bg-accent/5 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-accent/10 min-h-[80px]">
                    <p className="text-sm md:text-base whitespace-pre-wrap">{correction.data.enhancedText}</p>
                  </div>
                </NeuCard>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-primary/10 bg-background/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="flex gap-4 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              </svg>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            CorrijaMuniz © 2025 - Powered by OpenAI GPT
          </p>
        </div>
      </footer>
    </div>
  );
}
