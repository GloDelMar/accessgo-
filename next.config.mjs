const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        pathname: '/api/v1/image/assets/**',
      },
    ],
    dangerouslyAllowSVG: true, 
  },
};

export default nextConfig;
