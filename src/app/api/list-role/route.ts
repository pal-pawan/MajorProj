import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
require('dotenv').config();

export async function GET(req: NextRequest, res:NextResponse) {
    const genAi = new GoogleGenerativeAI("AIzaSyBhAPdz0rNQN8u_knQgYZIKLruoIH5PKmM");
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = 'Get me a list of 5 most sought after roles for interviews in mumbai , that people are preparing , in the form of an array without markup aka plain text, also avoid escape characters even at the end of line ,for example ( ["fullstack developer", "software engineer", "data analyst", "database administrator", "customer support specialist"])';
    
    try {
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text();
        return Response.json({generatedText});
    } catch (error) {
        return Response.json({"message":"Failed to generate Response", error})
    }
}