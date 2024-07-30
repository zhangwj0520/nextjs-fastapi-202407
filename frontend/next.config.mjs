/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
    ],
  },

  rewrites: async () => {
    return [
      // {
      //   source: '/api/:path*',
      //   destination:
      //     process.env.NODE_ENV === 'development'
      //       ? 'http://127.0.0.1:9110/api/:path*'
      //       : '/api/',
      // },
      {
        source: '/docs',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:9110/docs'
            : '/api/docs',
      },
      {
        source: '/openapi.json',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:9110/openapi.json'
            : '/api/openapi.json',
      },
    ]
  },
}

export default nextConfig
