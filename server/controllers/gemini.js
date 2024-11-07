import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log("Prompt: " + prompt);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        console.log("Response: " + result.response.text());
        res.status(200).json(result.response);
    } catch (error) {
        res.status(500).json({ message: "Error." });
    }
};
