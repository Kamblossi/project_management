/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://ifkafin-s3-images.s3.us-east-1.amazonaws.com/i1.jpg",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
