import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Blog</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {allPostsData.map(({ id, date, title }) => (
            <Link key={id} href={`/posts/${id}`}>
              <a className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
                  <p className="text-sm text-gray-600">{date}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}