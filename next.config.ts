import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    optimizePackageImports: ['lodash', 'date-fns', 'lucide-react'],
  },
})
