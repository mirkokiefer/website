import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import dynamic from 'next/dynamic'
import NoSSR from 'react-no-ssr'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/three'), { ssr: false })

function Loading() {
  return <div>Loading...</div>
}

export default function Three() {
  return (
    <>
      <PageSEO title={`Three.js - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Three.js Playground
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <NoSSR onSSR={<Loading />}>
            <DynamicComponentWithNoSSR />
          </NoSSR>
        </div>
      </div>
    </>
  )
}
