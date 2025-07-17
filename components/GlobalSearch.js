import { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, Clock, Tag, ExternalLink, Home, User, BookOpen, FolderOpen } from 'lucide-react';

const url_prefix = 'https://tridentforu.com/';

const pages = [
  { name: 'Home', href: url_prefix, description: 'Welcome to Tristan Poland\'s personal website', pinned: true },
  { name: 'About', href: `${url_prefix}about`, description: 'Learn more about Tristan Poland and his journey', pinned: true },
  { name: 'Blog', href: `${url_prefix}blog`, description: 'Latest thoughts on web development and design', pinned: true },
  { name: 'Projects', href: `${url_prefix}projects`, description: 'Featured project: Portfolio redesign 2025', pinned: true },
  // { name: 'Contact', href: '/contact', description: 'Get in touch with Tristan Poland', pinned: false },
  // { name: 'Resources', href: '/resources', description: 'Useful tools and resources for developers', pinned: false },
  // { name: 'Testimonials', href: '/testimonials', description: 'What others say about working with Tristan', pinned: false },
  // { name: 'Services', href: '/services', description: 'Professional services offered by Tristan Poland', pinned: false },
  // { name: 'FAQ', href: '/faq', description: 'Frequently asked questions about services and work', pinned: false },
  // { name: 'Gallery', href: '/gallery', description: 'Visual showcase of previous projects', pinned: false },
];

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isPeeking, setIsPeeking] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${url_prefix}blog/blog-index.json`);
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    
    fetchBlogPosts();
  }, []);

  // Handle search functionality
  useEffect(() => {
    setIsLoading(true);
    
    if (searchQuery.trim() === '') {
      // Always show pages first, then blogs
      const pageResults = [...pages];
      const blogResults = blogPosts.slice(0, 3).map(post => ({
        name: post.title,
        href: `${url_prefix}blog/posts/${post.slug}`,
        description: truncateText(post.excerpt, 100),
        type: 'blog',
        date: post.date,
        readingTime: post.readingTime,
        categories: post.categories,
        tags: post.tags,
        author: post.author
      }));
      
      // Combine with pages first, then blogs
      const combinedResults = [...pageResults, ...blogResults];
      setSearchResults(combinedResults);
      setSelectedResultIndex(combinedResults.length > 0 ? 0 : -1);
      setIsLoading(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Search in pages
    const pageResults = pages.filter(page => 
      page.name.toLowerCase().includes(query) || 
      page.description.toLowerCase().includes(query)
    );
    
    // Search in blog posts
    const blogResults = blogPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      post.categories.some(category => category.toLowerCase().includes(query)) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    ).map(post => ({
      name: post.title,
      href: `${url_prefix}blog/posts/${post.slug}`,
      description: truncateText(post.excerpt, 100),
      type: 'blog',
      date: post.date,
      readingTime: post.readingTime,
      categories: post.categories,
      tags: post.tags,
      author: post.author
    }));
    
    // Always combine with pages first, then blogs
    const combinedResults = [...pageResults, ...blogResults];
    
    setSearchResults(combinedResults);
    setSelectedResultIndex(combinedResults.length > 0 ? 0 : -1);
    setIsLoading(false);
  }, [searchQuery, blogPosts]);

  // Update selectedResult when selectedResultIndex changes
  useEffect(() => {
    if (selectedResultIndex >= 0 && searchResults[selectedResultIndex]) {
      setSelectedResult(searchResults[selectedResultIndex]);
    } else {
      setSelectedResult(null);
    }
  }, [selectedResultIndex, searchResults]);

  // Helper function to truncate text and ensure it's single line
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    // Remove line breaks, markdown symbols, and excessive spaces
    const cleanText = text
      .replace(/\r?\n/g, ' ')
      .replace(/#/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Close search with escape
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setSearchQuery('');
        setSelectedResult(null);
        setIsPeeking(false);
      }
      // Handle spacebar for peek
      else if (e.key === ' ' && isOpen && selectedResultIndex >= 0) {
        e.preventDefault();
        setIsPeeking(true);
      }
      // Handle arrow navigation in search results
      else if (isOpen && searchResults.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedResultIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedResultIndex(prev => 
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
        } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
          e.preventDefault();
          handleResultSelection(searchResults[selectedResultIndex]);
        }
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === ' ' && isOpen) {
        setIsPeeking(false);
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, searchResults, selectedResultIndex]);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedResult(null);
      setIsPeeking(false);
      setSelectedResultIndex(-1);
    }
  }, [isOpen]);

  const handleResultSelection = (result) => {
    console.log(`Navigating to: ${result.href}`);
    onClose();
    
    // Use window.location.href for direct navigation to avoid any path issues
    window.location.href = result.href;
  };

  // Format date for blog posts
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get icon for result type
  const getResultIcon = (result) => {
    if (result.type === 'blog') return <BookOpen className="h-4 w-4" />;
    if (result.name === 'Home') return <Home className="h-4 w-4" />;
    if (result.name === 'About') return <User className="h-4 w-4" />;
    if (result.name === 'Projects') return <FolderOpen className="h-4 w-4" />;
    return <BookOpen className="h-4 w-4" />;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20"
      style={{
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      <style>{`
        @keyframes slideOutResults {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-24px); }
        }
        @keyframes slideInResults {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInPanel {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutPanel {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }
      `}</style>
      
      <div className={`w-full flex gap-4 ${isPeeking ? 'max-w-6xl' : 'max-w-2xl justify-center'}`}>
        {/* Main Search Panel */}
        <div className={`bg-black/95 rounded-2xl border border-gray-800 shadow-2xl transition-all duration-300 h-[32rem] flex flex-col ${
          selectedResult && isPeeking ? 'w-1/2' : 'w-full'
        }`} style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.85)' }}>
          <div className="p-4 flex items-center border-b border-gray-800 flex-shrink-0">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search across all pages and blog posts..."
              className="w-full bg-transparent text-white focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {isLoading ? (
              <div className="py-2 px-3 text-sm text-gray-400">
                Loading results...
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-2 px-3 text-sm text-gray-400">
                No results found for "{searchQuery}"
              </div>
            ) : (
              <>
                {/* Animate default results out when searchQuery is entered */}
                <div
                  style={{
                    animation: searchQuery.trim() ? 'slideOutResults 0.3s forwards' : 'slideInResults 0.3s',
                    display: searchQuery.trim() ? 'none' : 'block'
                  }}
                >
                  {/* Pages heading if there are pages in results */}
                  {searchResults.some(result => !result.type) && (
                    <div className="py-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Pages
                    </div>
                  )}
                  {/* Display page results */}
                  {searchResults
                    .filter(result => !result.type)
                    .map((result, index) => {
                      const resultIndex = searchResults.indexOf(result);
                      return (
                        <div 
                          key={result.href}
                          className={`py-2 px-3 hover:bg-gray-900/80 rounded-lg cursor-pointer transition-all duration-150 ${
                            resultIndex === selectedResultIndex ? 'bg-gray-900/80' : ''
                          }`}
                          onClick={() => handleResultSelection(result)}
                          onMouseEnter={() => setSelectedResultIndex(resultIndex)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              {getResultIcon(result)}
                              <div className="text-blue-400 text-sm">{result.name}</div>
                            </div>
                            {result.pinned && (
                              <div className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded">
                                Pinned
                              </div>
                            )}
                          </div>
                          <div className="text-white text-base truncate">{result.description}</div>
                        </div>
                      );
                    })
                  }
                  {/* Separator if both types are present */}
                  {searchResults.some(result => result.type === 'blog') && 
                   searchResults.some(result => !result.type) && (
                    <div className="border-t border-gray-800 my-2"></div>
                  )}
                  {/* Blog heading if there are blog posts in results */}
                  {searchResults.some(result => result.type === 'blog') && (
                    <div className="py-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Blog Posts
                    </div>
                  )}
                  {/* Display blog results */}
                  {searchResults
                    .filter(result => result.type === 'blog')
                    .map((result, index) => {
                      const resultIndex = searchResults.indexOf(result);
                      return (
                        <div 
                          key={result.href}
                          className={`py-2 px-3 hover:bg-gray-900/80 rounded-lg cursor-pointer transition-all duration-150 ${
                            resultIndex === selectedResultIndex ? 'bg-gray-900/80' : ''
                          }`}
                          onClick={() => handleResultSelection(result)}
                          onMouseEnter={() => setSelectedResultIndex(resultIndex)}
                        >
                            <div className="mb-1">
                              <div className="flex items-center gap-2 mb-1">
                                {getResultIcon(result)}
                                <div className="text-blue-400 text-sm leading-snug line-clamp-2 break-words">{result.name}</div>
                              </div>
                              <div className="flex space-x-2" style={{whiteSpace: 'nowrap'}}>
                                <div className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded" style={{whiteSpace: 'nowrap'}}>
                                  {formatDate(result.date)}
                                </div>
                                <div className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded" style={{whiteSpace: 'nowrap'}}>
                                  {result.readingTime} min read
                                </div>
                              </div>
                            </div>
                          <div className="text-white text-base truncate">{result.description}</div>
                        </div>
                      );
                    })
                  }
                </div>
                {/* When searching, show all results with slide-in animation */}
                {searchQuery.trim() && (
                  <div style={{ animation: 'slideInResults 0.3s' }}>
                    {/* Pages heading if there are pages in results */}
                    {searchResults.some(result => !result.type) && (
                      <div className="py-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Pages
                      </div>
                    )}
                    {searchResults
                      .filter(result => !result.type)
                      .map((result, index) => {
                        const resultIndex = searchResults.indexOf(result);
                        return (
                          <div 
                            key={result.href}
                            className={`py-2 px-3 hover:bg-gray-900/80 rounded-lg cursor-pointer transition-all duration-150 ${
                              resultIndex === selectedResultIndex ? 'bg-gray-900/80' : ''
                            }`}
                            onClick={() => handleResultSelection(result)}
                            onMouseEnter={() => setSelectedResultIndex(resultIndex)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                {getResultIcon(result)}
                                <div className="text-blue-400 text-sm">{result.name}</div>
                              </div>
                              {result.pinned && (
                                <div className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded">
                                  Pinned
                                </div>
                              )}
                            </div>
                            <div className="text-white text-base truncate">{result.description}</div>
                          </div>
                        );
                      })
                    }
                    {/* Separator if both types are present */}
                    {searchResults.some(result => result.type === 'blog') && 
                     searchResults.some(result => !result.type) && (
                      <div className="border-t border-gray-800 my-2"></div>
                    )}
                    {/* Blog heading if there are blog posts in results */}
                    {searchResults.some(result => result.type === 'blog') && (
                      <div className="py-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Blog Posts
                      </div>
                    )}
                    {searchResults
                      .filter(result => result.type === 'blog')
                      .map((result, index) => {
                        const resultIndex = searchResults.indexOf(result);
                        return (
                          <div 
                            key={result.href}
                            className={`py-2 px-3 hover:bg-gray-900/80 rounded-lg cursor-pointer transition-all duration-150 ${
                              resultIndex === selectedResultIndex ? 'bg-gray-900/80' : ''
                            }`}
                            onClick={() => handleResultSelection(result)}
                            onMouseEnter={() => setSelectedResultIndex(resultIndex)}
                          >
                            <div className="mb-1">
                              <div className="flex items-center gap-2 mb-1">
                                {getResultIcon(result)}
                                <div className="text-blue-400 text-sm leading-snug line-clamp-2 break-words">{result.name}</div>
                              </div>
                              <div className="flex space-x-2" style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                <div className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded" style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '7em'}}>
                                  {formatDate(result.date)}
                                </div>
                                <div className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded" style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '8em'}}>
                                  {result.readingTime} min read
                                </div>
                              </div>
                            </div>
                            <div className="text-white text-base truncate">{result.description}</div>
                          </div>
                        );
                      })
                    }
                  </div>
                )}
              </>
            )}
          </div>
          {searchResults.length > 0 && (
            <div className="p-3 border-t border-gray-800 text-xs flex justify-between text-gray-500 flex-shrink-0">
              <div>Press <kbd className="bg-gray-800 rounded px-1 py-0.5">↑</kbd> <kbd className="bg-gray-800 rounded px-1 py-0.5">↓</kbd> to navigate</div>
              <div>Hold <kbd className="bg-gray-800 rounded px-1 py-0.5">Space</kbd> to peek • <kbd className="bg-gray-800 rounded px-1 py-0.5">Enter</kbd> to select</div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        {selectedResult && isPeeking && (
          <div 
            className="w-1/2 bg-black/95 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden h-[32rem] flex flex-col"
            style={{ 
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.85)',
              animation: 'slideInPanel 0.3s ease-out'
            }}
          >
            <div className="flex-1 overflow-y-auto p-6">
              {/* Header */}
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 bg-gray-800/60 rounded-lg">
                  {getResultIcon(selectedResult)}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2 leading-tight">
                    {selectedResult.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-3">
                    {selectedResult.pinned && (
                      <div className="bg-blue-900/40 text-blue-300 text-xs px-2 py-1 rounded">
                        Pinned
                      </div>
                    )}
                    <div className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                      {selectedResult.type === 'blog' ? 'Blog Post' : 'Page'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedResult.description}
                </p>
              </div>

              {/* Blog-specific metadata */}
              {selectedResult.type === 'blog' && (
                <>
                  {/* Date and Reading Time */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Published
                      </h3>
                      <p className="text-white">{formatDate(selectedResult.date)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Reading Time
                      </h3>
                      <p className="text-white">{selectedResult.readingTime} min read</p>
                    </div>
                  </div>

                  {/* Author */}
                  {selectedResult.author && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Author</h3>
                      <p className="text-white">{selectedResult.author}</p>
                    </div>
                  )}

                  {/* Categories */}
                  {selectedResult.categories && selectedResult.categories.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedResult.categories.map((category, index) => (
                          <span 
                            key={index}
                            className="bg-blue-900/40 text-blue-300 text-xs px-2 py-1 rounded"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {selectedResult.tags && selectedResult.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedResult.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* URL */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">URL</h3>
                <p className="text-gray-300 text-sm font-mono break-all">
                  {selectedResult.href}
                </p>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleResultSelection(selectedResult)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open {selectedResult.type === 'blog' ? 'Blog Post' : 'Page'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}