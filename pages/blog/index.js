import { useState } from 'react';
import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  console.log('Posts from getStaticProps:', allPostsData);
  return {
    props: { allPostsData }
  };
}

export default function Home({ allPostsData = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortOrder, setSortOrder] = useState('Latest First');
  
  console.log('Current posts:', allPostsData);

  const filteredPosts = allPostsData
    .filter(post => post?.title)
    .filter(post => {
      const query = searchQuery.toLowerCase();
      const title = (post.title || '').toLowerCase();
      return query === '' || title.includes(query);
    })
    .filter(post => {
      const cats = Array.isArray(post.categories) ? post.categories : [];
      return selectedCategory === 'All Categories' || cats.includes(selectedCategory);
    })
    .sort((a, b) => {
      if (!a?.date || !b?.date) return 0;
      return sortOrder === 'Latest First' ? 
        new Date(b.date) - new Date(a.date) : 
        new Date(a.date) - new Date(b.date);
    });

  console.log('Filtered posts:', filteredPosts);

  const allCategories = Array.from(new Set(
    allPostsData
      .flatMap(post => Array.isArray(post.categories) ? post.categories : [])
  ));
  
  console.log('Available categories:', allCategories);

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="flex gap-4 mb-12">
          <div className="relative flex-1">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search articles..."
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-blue-500"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select 
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="All Categories">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option>Latest First</option>
            <option>Oldest First</option>
          </select>
        </div>

        <div className="space-y-6">
          {filteredPosts.map(post => (
            <Link key={post.id} href={`/posts/${post.id}`} className="block bg-gray-900/30 rounded-lg p-8 hover:bg-gray-900/40 transition-colors">
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.isArray(post.categories) && post.categories.map(cat => (
                  <span key={cat} className="px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm">
                    {cat}
                  </span>
                ))}
                {Array.isArray(post.tags) && post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">{post.title}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-400">
                  <span>Tristan Poland</span>
                  <span>•</span>
                  <span>35 min read</span>
                </div>
                <span className="text-blue-400">Read more →</span>
              </div>
            </Link>
          ))}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No posts found matching your criteria
            </div>
          )}
        </div>
      </main>
    </div>
  );
}