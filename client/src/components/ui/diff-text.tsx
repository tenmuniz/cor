import * as diff from 'diff';
import { cn } from '@/lib/utils';

interface DiffTextProps {
  originalText: string;
  correctedText: string;
}

interface DiffPart {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export function DiffText({ originalText, correctedText }: DiffTextProps) {
  const differences = diff.diffWords(originalText, correctedText);

  return (
    <div className="font-sans text-base leading-relaxed break-words">
      {differences.map((part: DiffPart, index: number) => {
        // Adicionar as classes CSS de acordo com o tipo de mudança
        const classes = cn(
          "transition-all",
          part.added && "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium mx-0.5 px-0.5 rounded",
          part.removed && "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 line-through mx-0.5 px-0.5 rounded"
        );

        return (
          <span key={index} className={classes}>
            {part.value}
          </span>
        );
      })}
    </div>
  );
}