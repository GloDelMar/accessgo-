const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'accessgo-test-s3-bucket.s3.amazonaws.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        pathname: '**'
      }
    ],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    unoptimized: false
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.mode = "production";
    }
    return config;
  },
};

export default nextConfig;
