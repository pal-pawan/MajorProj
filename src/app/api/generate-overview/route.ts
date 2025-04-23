import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();

export async function POST(req: Request) {
    try {
        const roleResponse = await req.json();
        const responseData = roleResponse.role;

        const genAi = new GoogleGenerativeAI(process.env.GEN_AI_KEY as string);
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `provide an overview of the role ${responseData} covering all aspects of the job profile (keep it consize, to the point) in json format as given:{"general_responsibilities": "Design, develop and maintain both front-end and back-end components of web applications.  Involved in all stages of the development lifecycle, from conception to deployment.","interview_rounds": ["Initial screening", "Technical assessment (coding challenges)", "Technical interview(s)"],"top_skills_and_technologies": ["HTML", "CSS", "JavaScript", "Back-end language (e.g., Python, Node.js, Java, PHP)", "Databases (SQL, NoSQL)", "REST APIs", "Git", "Testing frameworks", "Cloud platforms (AWS, Azure, GCP)", "Front-end frameworks (e.g., React, Angular, Vue.js)"],"expected_salary": "3-5 LPA"}`;

        const result = await model.generateContent(prompt);
        const generatedOverview = result.response.text();
        return NextResponse.json({ generatedOverview });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "message": "Failed to generate Response", error });
    }
}
