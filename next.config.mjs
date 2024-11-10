/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'accessgo-test-s3-bucket.s3.amazonaws.com' ],
    

  },
};

export default nextConfig;
