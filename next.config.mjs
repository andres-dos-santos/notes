/** @type {import('next').NextConfig} */

import dayjs from 'dayjs'

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/notes?from=${dayjs(new Date()).format('YYYY-MM-DD')}`,
        permanent: false,
      },
    ]
  },
}

export default nextConfig
