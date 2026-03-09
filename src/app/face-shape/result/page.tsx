import FaceShapeResultContent from "@/components/FaceShapeResultContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Face Shape Result | FINDCORE",
    description: "View your AI-analyzed face shape and personalized style guide.",
};

export default function FaceShapeResultPage() {
    return <FaceShapeResultContent />;
}
