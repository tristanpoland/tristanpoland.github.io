import { getAllPostIds, getPostData } from '../../lib/posts'
import Link from 'next/link'

export default function Post({ postData }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <a className="text-blue-600 hover:text-blue-800 mb-4 inline-block">&larr; Back to home</a>
        </Link>
        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{postData.title}</h1>
            <p className="text-sm text-gray-600 mb-4">{postData.date}</p>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
            />
          </div>
        </article>
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}