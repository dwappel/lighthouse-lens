/**
 * WordCounter - Analyzes word and glyph counts
 */

class WordCounter {
  constructor(fountainHandler) {
    this.fountainHandler = fountainHandler;
  }

  countTotalWords() {
    const text = this.fountainHandler.getRawText();
    if (!text) return 0;
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  }

  countTotalGlyphs(includeSpaces = true) {
    const text = this.fountainHandler.getRawText();
    if (!text) return 0;
    return includeSpaces ? text.length : text.replace(/\s/g, "").length;
  }

  generateReport() {
    const parsed = this.fountainHandler.getParsedScript();
    const tokens = parsed ? parsed.tokens || [] : [];

    // Count dialogue and action
    let dialogueWords = 0;
    let actionWords = 0;
    let currentCharacter = null;
    const characterData = {};

    tokens.forEach((token) => {
      if (token.type === "character") {
        currentCharacter = token.text.replace(/\(.*?\)/g, "").trim();
        if (!characterData[currentCharacter]) {
          characterData[currentCharacter] = { words: 0, dialogueBlocks: 0 };
        }
      } else if (token.type === "dialogue" && currentCharacter) {
        const words = token.text
          .split(/\s+/)
          .filter((w) => w.length > 0).length;
        dialogueWords += words;
        characterData[currentCharacter].words += words;
        characterData[currentCharacter].dialogueBlocks += 1;
      } else if (token.type === "action") {
        actionWords += token.text
          .split(/\s+/)
          .filter((w) => w.length > 0).length;
      }
    });

    const totalWords = this.countTotalWords();
    const total = dialogueWords + actionWords || 1;

    return {
      summary: {
        totalWords,
        totalGlyphs: this.countTotalGlyphs(true),
        totalGlyphsNoSpaces: this.countTotalGlyphs(false),
        actionWords,
        dialogueWords,
        actionPercentage: Math.round((actionWords / total) * 100),
        dialoguePercentage: Math.round((dialogueWords / total) * 100),
      },
      characters: {
        count: Object.keys(characterData).length,
        ranked: Object.entries(characterData)
          .map(([name, data]) => ({ name, ...data }))
          .sort((a, b) => b.words - a.words),
      },
    };
  }
}

// Make it available globally
if (typeof window !== "undefined") {
  window.WordCounter = WordCounter;
}
