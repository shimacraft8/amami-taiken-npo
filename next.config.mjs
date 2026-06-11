/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // フリー素材（Unsplash / Pexels / PAKUTASO）のリモート画像を許可
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "www.pakutaso.com" },
    ],
  },
};

export default nextConfig;
