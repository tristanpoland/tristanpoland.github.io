import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Calendar, Star, GitFork } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import featuredProjectsData from '../data/featured-projects.json';

const FeaturedProjects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const featuredProjects = featuredProjectsData;

  useEffect(() => {
    if (expandedProject?.content_file) {
      setIsLoadingContent(true);
      fetch(expandedProject.content_file)
        .then(response => response.text())
        .then(text => {
          setMarkdownContent(text);
          setIsLoadingContent(false);
        })
        .catch(error => {
          console.error('Error loading markdown:', error);
          setMarkdownContent('# Error\n\nFailed to load project content.');
          setIsLoadingContent(false);
        });
    }
  }, [expandedProject]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="space-y-12 mb-24">
        <div>
          <h2 className="text-3xl font-bold text-blue-400 mb-2">Featured Projects</h2>
          <p className="text-gray-400">Deep dive into my largest and favorite projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setExpandedProject(project)}
              className="group bg-gray-900/10 rounded-lg border border-gray-900/20 overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1"
            >
              <div className="aspect-video bg-gray-800/50 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect width="400" height="225" fill="%23111827"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%234b5563"%3EProject Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {expandedProject && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setExpandedProject(null)}
        >
          <div
            className="bg-gray-900 border border-gray-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-6 flex items-start justify-between z-10">
              <div className="flex-1 pr-8">
                <h2 className="text-3xl font-bold text-blue-400 mb-2">
                  {expandedProject.title}
                </h2>
                <p className="text-gray-400">{expandedProject.tagline}</p>
              </div>
              <button
                onClick={() => setExpandedProject(null)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden">
                <img
                  src={expandedProject.image}
                  alt={expandedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect width="800" height="450" fill="%23111827"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%234b5563"%3EProject Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {expandedProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {expandedProject.github && (
                  <a
                    href={expandedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                  >
                    <Github size={18} />
                    View Source
                  </a>
                )}
                {expandedProject.demo && (
                  <a
                    href={expandedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink size={18} />
                    Site
                  </a>
                )}
              </div>

              {expandedProject.stats && (
                <div className="flex items-center gap-6 text-sm text-gray-400 border-t border-b border-gray-800 py-4">
                  {expandedProject.stats.stars !== undefined && (
                    <div className="flex items-center gap-2">
                      <Star size={16} />
                      <span>{expandedProject.stats.stars} stars</span>
                    </div>
                  )}
                  {expandedProject.stats.forks !== undefined && (
                    <div className="flex items-center gap-2">
                      <GitFork size={16} />
                      <span>{expandedProject.stats.forks} forks</span>
                    </div>
                  )}
                  {expandedProject.stats.updated && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Updated {formatDate(expandedProject.stats.updated)}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="prose prose-invert prose-blue max-w-none markdown-content">
                {isLoadingContent ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-blue-400 mt-8 mb-4" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-blue-300 mt-4 mb-2" {...props} />,
                      p: ({node, ...props}) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                      li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline" {...props} />,
                      code: ({node, inline, ...props}) => 
                        inline 
                          ? <code className="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm" {...props} />
                          : <code className="block bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4" {...props} />
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FeaturedProjects;
