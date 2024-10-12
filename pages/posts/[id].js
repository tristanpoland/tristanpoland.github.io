import Image from 'next/image';
import { getAllPostIds, getPostData } from '../../lib/posts';
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
      className="rounded-lg"
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
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-dark-primary hover:text-dark-secondary mb-4 inline-block transition-colors duration-300">
          &larr; Back to home
        </Link>
        <article className="bg-dark-surface shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-dark-primary">{postData.title}</h1>
            <p className="text-sm text-dark-text opacity-75 mb-4">{postData.date}</p>
            <div className="prose prose-dark max-w-none">
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
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}