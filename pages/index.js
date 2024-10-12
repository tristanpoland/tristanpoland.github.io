import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-dark-primary">My Blog</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {allPostsData.map(({ id, date, title }) => (
            <Link key={id} href={`/posts/${id}`} className="block bg-dark-surface rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 transition-transform duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-dark-secondary">{title}</h2>
                <p className="text-sm text-dark-text opacity-75">{date}</p>
              </div>
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