/**
 * FountainHandler - Wrapper for afterwriting Fountain parser
 */

class FountainHandler {
  constructor() {
    this.parsedScript = null;
    this.rawText = null;
  }

  loadScript(fountainText) {
    this.rawText = fountainText;

    // Use the afterwriting parser (loaded globally in HTML)
    if (typeof window !== "undefined" && window.fountain) {
      this.parsedScript = window.fountain.parse(fountainText, {
        use_print_profile: false,
      });
      return this.parsedScript;
    } else {
      throw new Error("Fountain parser not loaded");
    }
  }

  getScenes() {
    if (!this.parsedScript) {
      throw new Error("No script loaded");
    }
    return this.parsedScript.title_page
      ? this.parsedScript.title_page.scenes || []
      : [];
  }

  getCharacters() {
    if (!this.parsedScript) {
      throw new Error("No script loaded");
    }

    const characters = new Set();
    const tokens = this.parsedScript.tokens || [];

    tokens.forEach((token) => {
      if (token.type === "character") {
        const cleanName = token.text.replace(/\(.*?\)/g, "").trim();
        if (cleanName) characters.add(cleanName);
      }
    });

    return Array.from(characters).sort();
  }

  getRawText() {
    return this.rawText;
  }

  getParsedScript() {
    return this.parsedScript;
  }
}

// Make it available globally
if (typeof window !== "undefined") {
  window.FountainHandler = FountainHandler;
}
