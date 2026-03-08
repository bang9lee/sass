import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: [
    "@tensorflow-models/face-landmarks-detection",
    "@tensorflow/tfjs-core",
    "@tensorflow/tfjs-converter",
    "@tensorflow/tfjs-backend-webgl",
    "@mediapipe/face_mesh",
  ],
};

export default nextConfig;
