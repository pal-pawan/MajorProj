import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();

export async function GET() {
    const genAi = new GoogleGenerativeAI(process.env.GEN_AI_KEY as string);
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = 'Get me a list of 5 most sought after roles for interviews in India , that people are preparing , in the form of an array without markup aka plain text, also avoid escape characters even at the end of line ,for example ( ["fullstack developer", "software engineer", "data analyst", "database administrator", "customer support specialist"])';

    try {
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text();
        return NextResponse.json({ generatedText });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "message": "Failed to generate Response", error });
    }
}
