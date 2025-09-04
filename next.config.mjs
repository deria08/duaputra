/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["id", "en"], // bahasa yang tersedia
    defaultLocale: "id",   // bahasa default
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "ds393qgzrxwzn.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "bo.duaputra.co.id",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
