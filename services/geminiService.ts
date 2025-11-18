import { GoogleGenAI } from "@google/genai";

/**
 * Generates a personalized thank you message and a fun fact about the donation amount.
 */
export const generateImpactMessage = async (amount: string, provider: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return `Thank you for your donation of $${amount} via ${provider}! Your contribution makes a difference.`;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      I just donated $${amount} using a remaining balance on a ${provider} card.
      Write a short, heartwarming, and slightly witty thank you note.
      Include a fun comparison of what this specific small amount (e.g., $0.43) could buy in the year 1920, or what micro-impact it has today (like "buying a shoelace for a needy pair of shoes").
      Keep it under 50 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Thank you! Every cent counts.";
  } catch (error) {
    console.error("Error generating impact message:", error);
    return `Thank you for your donation of $${amount}! Your contribution helps us reach our goal.`;
  }
};