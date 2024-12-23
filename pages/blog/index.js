import { useState } from 'react';
import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';

export async function getStaticProps() {
 const allPostsData = await getSortedPostsData();
 return {
   props: { allPostsData }
 };
}

export default function Home({ allPostsData }) {
 const [searchQuery, setSearchQuery] = useState('');
 const [category, setCategory] = useState('All Categories');
 const [sortOrder, setSortOrder] = useState('Latest First');

 const filteredPosts = allPostsData
 .filter(post => {
   // Handle null/undefined title or categories
   if (!post?.title) return false;
   
   const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
   const matchesCategory = category === 'All Categories' || 
     (post.categories && post.categories.includes(category));
   return matchesSearch && matchesCategory;
 })
 .sort((a, b) => {
   if (!a.date || !b.date) return 0;
   if (sortOrder === 'Latest First') {
     return new Date(b.date) - new Date(a.date);
   }
   return new Date(a.date) - new Date(b.date);
 });

 const categories = ['All Categories', 'Engineering', 'Performance'];

 return (
   <div className="min-h-screen bg-black text-gray-300">
     <main className="max-w-6xl mx-auto py-16 px-6">
       {filteredPosts.length > 0 && (
         <div className="mb-24">
           <div className="inline-block px-4 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm mb-6">
             Featured Post
           </div>
           
           <Link href={`/posts/${filteredPosts[0].id}`} className="block">
             <h2 className="text-5xl font-bold text-blue-400 mb-4">
               {filteredPosts[0].title}
             </h2>
             <p className="text-lg text-gray-400 mb-4 max-w-2xl">
               Discover the journey of building and experimenting with new technologies
             </p>
             <div className="flex items-center gap-4 text-gray-400">
               <span>Tristan Poland</span>
               <span>•</span>
               <span>35 min read</span>
             </div>
           </Link>
         </div>
       )}

       <p className="text-center text-xl text-gray-400 mb-12">
         Insights, tutorials, and stories from the development team and community
       </p>

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
           value={category}
           onChange={e => setCategory(e.target.value)}
           className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
         >
           {categories.map(cat => (
             <option key={cat}>{cat}</option>
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

       <div className="grid gap-8">
         {filteredPosts.slice(1).map(({ id, date, title }) => (
           <Link key={id} href={`/blog/posts/${id}`} className="block bg-gray-900/30 rounded-lg p-8">
             <div className="flex gap-3 mb-4">
               <span className="px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm">Engineering</span>
               <span className="px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm">Performance</span>
             </div>
             <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
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
       </div>
     </main>
   </div>
 );
}