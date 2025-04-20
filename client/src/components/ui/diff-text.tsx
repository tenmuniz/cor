import React, { useMemo } from 'react';

interface DiffTextProps {
  originalText: string;
  correctedText: string;
}

export function DiffText({ originalText, correctedText }: DiffTextProps) {
  const highlightedDiff = useMemo(() => {
    if (originalText === correctedText) return correctedText;
    
    // This is a simplified diff highlighter
    let result = '';
    let i = 0, j = 0;
    
    while (i < originalText.length || j < correctedText.length) {
      if (i < originalText.length && j < correctedText.length && originalText[i] === correctedText[j]) {
        result += originalText[i];
        i++;
        j++;
      } else {
        // Find next matching position
        let nextMatchOriginal = i;
        let nextMatchCorrected = j;
        let found = false;
        
        // Look ahead to find next matching character
        const lookAheadLimit = 10; // Limit how far we look ahead
        
        for (let k = 1; k < lookAheadLimit && (i + k < originalText.length || j + k < correctedText.length); k++) {
          if (i + k < originalText.length && j < correctedText.length && originalText[i + k] === correctedText[j]) {
            nextMatchOriginal = i + k;
            nextMatchCorrected = j;
            found = true;
            break;
          }
          
          if (i < originalText.length && j + k < correctedText.length && originalText[i] === correctedText[j + k]) {
            nextMatchOriginal = i;
            nextMatchCorrected = j + k;
            found = true;
            break;
          }
        }
        
        // Handle removed text
        if (nextMatchOriginal > i) {
          result += `<span class="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 line-through px-0.5 rounded">${originalText.substring(i, nextMatchOriginal)}</span>`;
          i = nextMatchOriginal;
        }
        
        // Handle added text
        if (nextMatchCorrected > j) {
          result += `<span class="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-0.5 rounded">${correctedText.substring(j, nextMatchCorrected)}</span>`;
          j = nextMatchCorrected;
        }
        
        // If no match found, just advance one character in both strings
        if (!found) {
          if (i < originalText.length) {
            result += `<span class="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 line-through px-0.5 rounded">${originalText[i]}</span>`;
            i++;
          }
          
          if (j < correctedText.length) {
            result += `<span class="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-0.5 rounded">${correctedText[j]}</span>`;
            j++;
          }
        }
      }
    }
    
    return result;
  }, [originalText, correctedText]);

  return <div dangerouslySetInnerHTML={{ __html: highlightedDiff }} />;
}
