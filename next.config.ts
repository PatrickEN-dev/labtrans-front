import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração para SPA (Single Page Application)
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Melhora a performance de desenvolvimento
    optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"],
  },
  // Configurações para melhor hidratação
  reactStrictMode: true,
  // Configurações de compilação
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
