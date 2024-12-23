import Image from 'next/image';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CustomImage = ({ src, alt }) => {
  const imageSrc = src.startsWith('/') ? src : `/images/${src}`;
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={600}
      height={400}
      layout="responsive"
      className="rounded-xl"
    />
  );
};

const CustomParagraph = (props) => {
  if (typeof props.children === 'object' && props.children.type === CustomImage) {
    return props.children;
  }
  return <p {...props} />;
};

export default function Post({ postData }) {
  return (
    <div className="min-h-screen bg-black text-gray-300">
      <main className="max-w-4xl mx-auto py-16 px-6">
        <Link 
          href="/blog/" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        <article className="bg-gray-900/30 rounded-2xl">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-white">{postData.title}</h1>
            <div className="flex items-center gap-4 text-gray-400 mb-8">
              <span>Tristan Poland</span>
              <span>•</span>
              <span>{postData.date}</span>
            </div>
            
            <div className="prose prose-invert max-w-none 
              prose-headings:text-white 
              prose-p:text-gray-300 
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-strong:text-white
              prose-code:text-blue-300 prose-code:bg-blue-900/20 prose-code:rounded prose-code:px-1
              prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-800"
            >
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  img: CustomImage,
                  p: CustomParagraph
                }}
              >
                {postData.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  console.log('Paths:', paths); // Debug log
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}