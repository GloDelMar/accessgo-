const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'accessgo-test-s3-bucket.s3.amazonaws.com',
        pathname: '**',
      },
    ],
    minimumCacheTTL: 60, // Reduce la carga en Next.js cacheando imágenes
    formats: ['image/webp'], // Soporte de formatos optimizados
    unoptimized: true, // Desactiva optimización si el problema persiste
  },
};

export default nextConfig;
