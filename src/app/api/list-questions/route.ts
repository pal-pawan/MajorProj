import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();

export async function POST(req: Request, res: Response) {
    try {
        const response = await req.json();
        const userRole = response.userSelectedRole;


        const genAi = new GoogleGenerativeAI(process.env.GEN_AI_KEY as string);
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an experienced recruiter tasked with preparing a list of the 10 most frequently asked interview questions for an entry-level ${userRole} role. The questions should cover varying levels of difficulty: easy, medium, and hard.Format the output in JSON using the structure below:[{"title": "Question title here","levelOfDifficulty": "Easy | Medium | Hard","expectedAnswer": "A concise, clear response expected from a proficient candidate.","advice": "Brief guidance on how to approach or structure the answer effectively."}]Ensure that:The questions are relevant and practical for real-world interviews.The answers and advice are short, realistic, and actionable for candidates with decent proficiency.carve out a character of a young indian male who is applying for a job as a fresher for the role of fullstack developer, with relevent skills, education and experience for reference example:[{"title": "Tell me about yourself and your interest in full-stack development.","levelOfDifficulty": "Easy","expectedAnswer": ""I'm Rohan, a recent graduate from IIT Delhi with a strong interest in full-stack development. My final year project involved building a weather Application using React, Node.js, and MongoDB.  I enjoy the challenge of designing and implementing complete applications.\"","advice": "Structure your response chronologically, focusing on achievements and skills relevant to the role.  Keep it concise and engaging."}]`;

        const result = await model.generateContent(prompt);
        const generatedQuestionList = result.response.text();
        return Response.json({ generatedQuestionList });
    } catch (error) {
        console.log(error);
        return Response.json({ "message": "Failed to generate Questions", error });
    }
}
