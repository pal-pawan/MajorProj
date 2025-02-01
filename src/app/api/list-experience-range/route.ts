import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
require('dotenv').config();

export async function GET(req: NextRequest, res:NextResponse) {
    const genAi = new GoogleGenerativeAI("AIzaSyBhAPdz0rNQN8u_knQgYZIKLruoIH5PKmM");
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = 'list me top 4 experience range asked for most sought after jobs in india, in the form of an array without markup aka plain text, also avoid escape characters even at the end of line ,for example ( ["0 years", "1-2 years", "2-3 years", "5 years or more"])';
    
    try {
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text();
        return Response.json({generatedText});
    } catch (error) {
        return Response.json({"message":"Failed to generate Response", error})
    }
}