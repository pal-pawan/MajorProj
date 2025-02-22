import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();

export async function POST(req: Request, res: Response) {
    try {
        const response = await req.json();
        

        const genAi = new GoogleGenerativeAI(process.env.GEN_AI_KEY as string);
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = ``;

        const result = await model.generateContent(prompt);
        const generatedOverview = result.response.text();
        return Response.json({ generatedOverview });
    } catch (error) {
        return Response.json({ "message": "Failed to generate Response", error })
    }
}
