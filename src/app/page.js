import Homepage from "./Components/Homepage";
import Link from "next/link";

export const metadata = {
  title: "AssessmentAI | AI-Powered Job Interview Assessment Generator",
  description:
    "Prepare for job interviews with AI-generated assessments and mock tests. Practice tailored interview questions, skill evaluations, and scenario-based assessments to boost your confidence.",
  keywords: [
    "AI job interview assessment",
    "mock interview generator",
    "AI interview questions",
    "job readiness test",
    "AI assessment tool",
    "interview practice platform",
    "AssessmentAI"
  ],
  openGraph: {
    title: "AssessmentAI | AI-Powered Job Interview Assessment Generator",
    description:
      "Generate realistic interview assessments, mock tests, and skill-based evaluations with AssessmentAI. Prepare smarter and boost your chances of landing your dream job.",
    url: "https://yourdomain.com",
    siteName: "AssessmentAI",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1199,
        height: 629,
        alt: "AssessmentAI - AI-powered job interview assessment generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AssessmentAI | AI Job Interview Assessment Generator",
    description:
      "Get AI-powered interview assessments and mock tests tailored to your career goals. Practice smarter, prepare better.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};


export default function Home(){
return(
  <Homepage/>
)
}