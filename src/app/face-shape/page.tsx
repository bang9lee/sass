import FaceShapeHomeClient from "@/components/face-shape-home-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Face Shape Analysis | FINDCORE",
    description: "Upload your photo for detailed AI face shape analysis with measured proportions, landmarks, and style guidance.",
};

export default function FaceShapePage() {
    return <FaceShapeHomeClient />;
}
