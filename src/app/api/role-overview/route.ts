import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();

export async function POST(req: Request, res: Response) {
    try {
        const roleResponse = await req.json();
        const responseData = roleResponse.role

        const genAi = new GoogleGenerativeAI(process.env.GEN_AI_KEY as string);
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `I'm starting interview preparation for the role of ${responseData}, provide me with an detailed overview including general roles and responsibilities, expected payroll in our country (India). Also provide with rounds involved in interview with general precautions. All without any formatting or markup and make it under 400 words. Explain as if what i can expect and what i have to prepare, including general precautions, tips and tricks`;

        const result = await model.generateContent(prompt);
        const generatedOverview = result.response.text();
        return Response.json({ generatedOverview });
    } catch (error) {
        return Response.json({ "message": "Failed to generate Response", error })
    }
}
