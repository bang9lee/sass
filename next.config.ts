import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // 모바일/로컬 네트워크 테스트를 위한 허용 (경고 제거용)
    allowedDevOrigins: ["192.168.55.216", "127.0.0.1", "localhost"],
  },
};

export default nextConfig;
