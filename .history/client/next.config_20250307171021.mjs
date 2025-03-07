/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disables ESLint errors from breaking the build
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pm-s3-images.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
