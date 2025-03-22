import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();

export async function POST(req: Request, res: Response) {
    try {
        const roleResponse = await req.json();
        const responseData = roleResponse.role;

        const genAi = new GoogleGenerativeAI(process.env.GEN_AI_KEY as string);
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Act as an experienced recruiter and career counselor and craft out a detailed overview of entry-level ${responseData} position. Include the general roles and responsibilities, the expected salary range in India, and the typical interview rounds involved. All without any formatting or markup and make it under 250 words`;

        const result = await model.generateContent(prompt);
        const generatedOverview = result.response.text();
        return Response.json({ generatedOverview });
    } catch (error) {
        console.log(error);
        return Response.json({ "message": "Failed to generate Response", error });
    }
}
