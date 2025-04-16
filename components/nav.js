import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { useRouter } from 'next/router';

// Enhanced navigation with pinned flag
const pages = [
  { name: 'Home', href: '/', description: 'Welcome to Tristan Poland\'s personal website', pinned: true },
  { name: 'About', href: '/about', description: 'Learn more about Tristan Poland and his journey', pinned: true },
  { name: 'Blog', href: '/blog', description: 'Latest thoughts on web development and design', pinned: true },
  { name: 'Projects', href: '/projects', description: 'Featured project: Portfolio redesign 2025', pinned: true },
  // { name: 'Contact', href: '/contact', description: 'Get in touch with Tristan Poland', pinned: false },
  // { name: 'Resources', href: '/resources', description: 'Useful tools and resources for developers', pinned: false },
  // { name: 'Testimonials', href: '/testimonials', description: 'What others say about working with Tristan', pinned: false },
  // { name: 'Services', href: '/services', description: 'Professional services offered by Tristan Poland', pinned: false },
  // { name: 'FAQ', href: '/faq', description: 'Frequently asked questions about services and work', pinned: false },
  // { name: 'Gallery', href: '/gallery', description: 'Visual showcase of previous projects', pinned: false },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const router = useRouter();

  // Filter navigation items for pinned pages
  const pinnedPages = pages.filter(page => page.pinned);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // Show all pages by default
      setSearchResults([...pages]);
      setSelectedResultIndex(pages.length > 0 ? 0 : -1);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = pages.filter(page => 
      page.name.toLowerCase().includes(query) || 
      page.description.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    setSelectedResultIndex(results.length > 0 ? 0 : -1);
  }, [searchQuery]);

  // Handle keyboard events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    const handleKeyDown = (e) => {
      // Open search with slash key
      if (e.key === '/' && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      } 
      // Close search with escape
      else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
      // Handle arrow navigation in search results
      else if (isSearchOpen && searchResults.length > 0) {
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
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, searchResults, selectedResultIndex]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  const handleResultSelection = (result) => {
    // Navigate to the selected page - in a real implementation,
    // you would use your router's navigation method here
    console.log(`Navigating to: ${result.href}`);
    setSearchQuery('');
    setIsSearchOpen(false);
    router.push(result.href);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-xl text-white">Tristan Poland</span>
            </Link>

            {/* Desktop Navigation - Only Pinned Pages */}
            <div className="hidden md:flex items-center space-x-8">
              {pinnedPages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {page.name}
                </Link>
              ))}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-blue-400 flex items-center space-x-1 group"
              >
                <Search className="h-4 w-4" />
                <span className="text-sm text-gray-400 group-hover:text-blue-400">Press /</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-blue-400"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                className="text-gray-300 hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Only Pinned Pages */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="px-6 py-4 space-y-4">
              {pinnedPages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className="block text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Global Search Modal - Black with Blur */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl bg-black rounded-lg border border-gray-800 shadow-2xl">
            <div className="p-4 flex items-center border-b border-gray-800">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search across all pages..."
                className="w-full bg-transparent text-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-gray-400 hover:text-white ml-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-2">
              {searchResults.length === 0 ? (
                <div className="py-2 px-3 text-sm text-gray-400">
                  No results found for "{searchQuery}"
                </div>
              ) : (
                searchResults.map((result, index) => (
                  <div 
                    key={result.href}
                    className={`py-2 px-3 hover:bg-gray-800 rounded cursor-pointer ${
                      index === selectedResultIndex ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => handleResultSelection(result)}
                    onMouseEnter={() => setSelectedResultIndex(index)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-blue-400 text-sm">{result.name}</div>
                      {result.pinned && (
                        <div className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded">
                          Pinned
                        </div>
                      )}
                    </div>
                    <div className="text-white text-base">{result.description}</div>
                  </div>
                ))
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="p-3 border-t border-gray-800 text-xs flex justify-between text-gray-500">
                <div>Press <kbd className="bg-gray-800 rounded px-1 py-0.5">↑</kbd> <kbd className="bg-gray-800 rounded px-1 py-0.5">↓</kbd> to navigate</div>
                <div>Press <kbd className="bg-gray-800 rounded px-1 py-0.5">Enter</kbd> to select</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}