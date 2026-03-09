/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        "@mediapipe/tasks-vision",
        "@tensorflow-models/face-landmarks-detection",
        "@tensorflow/tfjs-core",
        "@tensorflow/tfjs-converter",
        "@tensorflow/tfjs-backend-webgl",
        "@mediapipe/face_mesh",
    ],
};

export default nextConfig;
