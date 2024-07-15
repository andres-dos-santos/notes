/** @type {import('next').NextConfig} */

import dayjs from 'dayjs'

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/date/?from=${dayjs().format('YYYY-MM-DD')}`,
        permanent: false,
      },
    ]
  },
}

export default nextConfig
