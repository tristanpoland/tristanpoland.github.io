import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { projects } from './projects';
import { experiences } from './experiences';

const Portfolio = () => {
  const [selectedSection, setSelectedSection] = useState('projects');

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <style>
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
        `}
      </style>
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="mb-24 space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-blue-400 mb-6">
              Hey, I'm Tristan{' '}
              <span className="inline-block" style={{ animation: 'wave 2.5s ease-in-out infinite', transformOrigin: '70% 70%' }}>
                👋
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl">
              Systems programmer, Web developer, and distributed infrastructure architect specializing in high-performance networking,
              scalable server solutions, and developer tooling. Passionate about building robust, efficient systems
              that push the boundaries of what's possible.
            </p>
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

        <div className="mb-12">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setSelectedSection('projects')}
              className={`px-4 py-2 rounded-lg ${selectedSection === 'projects'
                ? 'bg-blue-900/30 text-blue-400'
                : 'text-gray-400 hover:bg-gray-900/30'
                }`}
            >
              Projects
            </button>
            <button
              onClick={() => setSelectedSection('experience')}
              className={`px-4 py-2 rounded-lg ${selectedSection === 'experience'
                ? 'bg-blue-900/30 text-blue-400'
                : 'text-gray-400 hover:bg-gray-900/30'
                }`}
            >
              Experience
            </button>
          </div>

          {selectedSection === 'projects' && (
            <div className="grid gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-900/30 rounded-lg p-8 hover:bg-gray-900/50 transition-colors">
                  <Link href={project.link} className="block">
                    <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {selectedSection === 'experience' && (
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <div key={index} className="bg-gray-900/30 rounded-lg p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-1">{experience.title}</h3>
                      <p className="text-blue-400">{experience.company} · {experience.type}</p>
                    </div>
                    <span className="text-gray-400">{experience.period}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{experience.description}</p>
                  <p className="text-gray-400 mb-4">{experience.location}</p>
                  <div className="flex flex-wrap gap-3">
                    {experience.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Portfolio;