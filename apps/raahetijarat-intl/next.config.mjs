import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/redqteam.com/raahetijarat-furyroad/public/**",
      },
      {
        protocol: "https",
        hostname: "raahetijarat-furyroad.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "raahetijarat-furyroad.vercel.app",
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ["core"],
};

export default withNextIntl(nextConfig);
