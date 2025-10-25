import React, { useState } from 'react';
import Link from 'next/link';
import { experiences } from './experiences';

const Portfolio = () => {
  const [selectedSection, setSelectedSection] = useState('projects');

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <style jsx>
        {`
          @keyframes wave {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(14deg); }
            20% { transform: rotate(-8deg); }
            30% { transform: rotate(14deg); }
            40% { transform: rotate(-4deg); }
            50% { transform: rotate(10deg); }
            60% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
          }
          .wave-animation {
            animation: wave 2.5s ease-in-out infinite;
            transform-origin: 70% 70%;
          }
        `}
      </style>
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="mb-24 space-y-12">
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-stretch">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-48 h-full rounded-full overflow-hidden border-4 border-blue-400/30 shadow-lg shadow-blue-500/20 aspect-square">
                <img
                  src="/image/pfp.png"
                  alt="Tristan Poland"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 flex-1">
              <h1 className="text-5xl font-bold text-blue-400 mb-6">
                Hey, I&apos;m Tristan{' '}
                <span className="inline-block wave-animation">
                  👋
                </span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-3xl">
                Systems programmer, Web developer, and distributed infrastructure architect specializing in high-performance networking,
                scalable server solutions, and developer tooling. Passionate about building robust, efficient systems
                that push the boundaries of what&apos;s possible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="p-6 bg-blue-900/10 rounded-lg border border-blue-900/20">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Distributed Systems</h2>
              </div>
              <p className="text-gray-400">
                Building scalable, distributed server architectures with real-time communication capabilities
                and sophisticated synchronization mechanisms.
              </p>
            </div>

            <div className="p-6 bg-blue-900/10 rounded-lg border border-blue-900/20">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Systems Programming</h2>
              </div>
              <p className="text-gray-400">
                Crafting high-performance system tools and infrastructure automation solutions
                with a focus on reliability and efficiency using Rust and modern technologies.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/blog" className="px-6 py-3 bg-blue-900/30 rounded-lg text-blue-400 hover:bg-blue-900/50 transition-colors">
              Read My Blog
            </Link>
            <Link href="https://github.com/tristanpoland" className="px-6 py-3 bg-gray-900/30 rounded-lg text-gray-300 hover:bg-gray-900/50 transition-colors">
              View GitHub
            </Link>
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-blue-400">Experience</h2>
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={index} className="p-6 bg-gray-900/10 rounded-lg border border-gray-900/20">
                <h3 className="text-xl font-semibold text-blue-400">{experience.title}</h3>
                <p className="text-gray-400">
                  <span className="font-medium">{experience.company}</span> · {experience.period} · {experience.type}
                </p>
                <p className="text-gray-400">{experience.location}</p>
                <p className="text-gray-400 mt-2">{experience.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;