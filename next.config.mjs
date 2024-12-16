const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'accessgo-test-s3-bucket.s3.amazonaws.com'], // Dominios permitidos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com', // Asegúrate de las configuraciones específicas
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'accessgo-test-s3-bucket.s3.amazonaws.com',
        pathname: '**',
      },
    ],
    dangerouslyAllowSVG: true, // Opcional si necesitas permitir SVG
  },
};

export default nextConfig;
