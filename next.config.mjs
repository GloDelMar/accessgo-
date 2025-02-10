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
    formats: ['image/webp', 'image/avif'],
    unoptimized: false
  }
};

export default nextConfig;
