import { useMemo } from "react";
import * as diff from "diff";

interface DiffTextProps {
  originalText: string;
  correctedText: string;
}

export function DiffText({ originalText, correctedText }: DiffTextProps) {
  const differences = useMemo(() => {
    const diffs = diff.diffWords(originalText, correctedText);
    return diffs.map((part, index) => {
      const color = part.added 
        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
        : part.removed 
          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          : "";
      return (
        <span key={index} className={color}>
          {part.value}
        </span>
      );
    });
  }, [originalText, correctedText]);

  return <>{differences}</>;
}