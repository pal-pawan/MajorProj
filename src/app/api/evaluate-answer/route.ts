import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();

export async function POST(req: Request, res: Response) {
    try {
        const response = await req.json();
        const transcript = response.transcript;
        const question = response.question;
        const role = response.role;


        const genAi = new GoogleGenerativeAI(process.env.GEN_AI_KEY as string);
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an experienced recruiter carrying out an interview for the role of a ${role} and asked this question to the candidate:${question}. This is the transcript of the candidate's answer: ${transcript}.Now evaluate the transcript and format the output in JSON using the structure below: [{"strengths": ["clear", "concise", "relevant" ], "mistakes": [ "Generic", "too breif", "lack depth" ], "suggestedImprovements": [" provide specific examples of projects, internships, or real-world applications", "Mentioning relevant tools or technologies", "Briefly discuss career goals" ], "improvedAnswer": "I'm Rohan, a recent graduate from [University Name] with a degree in [Major], where I focused on applying statistical modeling and machine learning techniques.  My capstone project involved [brief description of project and quantifiable results, e.g., developing a predictive model for customer churn, resulting in a 15% improvement in retention].  This experience solidified my passion for using data to solve real-world business problems, particularly in [mention industry or area relevant to the job]. I'm very interested in this role at [Company Name] because [mention specific reasons, e.g., the company's work in [area], its innovative culture, or a specific project you find inspiring].  I'm confident my skills in [list 2-3 relevant skills from the job description] will be a valuable asset to your team." }] ensure that strength and mistakes are holonyms for good attributes and bad attributes of the response, and 'suggestedImprovements' must be concise, opinionated and to the point`;

        const result = await model.generateContent(prompt);
        const generatedEvaluation = result.response.text();
        return Response.json({ generatedEvaluation });
    } catch (error) {
        console.log(error);
        return Response.json({ "message": "unable to evaluate, please try again", error });
    }
}
