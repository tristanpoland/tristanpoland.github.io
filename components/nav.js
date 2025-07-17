import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import SearchModal from './GlobalSearch';

// Enhanced navigation with pinned flag
const url_prefix = 'https://tridentforu.com/';

const pages = [
  { name: 'Home', href: url_prefix, description: 'Welcome to Tristan Poland\'s personal website', pinned: true },
  { name: 'About', href: `${url_prefix}about`, description: 'Learn more about Tristan Poland and his journey', pinned: true },
  { name: 'Blog', href: `${url_prefix}blog`, description: 'Latest thoughts on web development and design', pinned: true },
  { name: 'Projects', href: `${url_prefix}projects`, description: 'Featured project: Portfolio redesign 2025', pinned: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter navigation items for pinned pages
  const pinnedPages = pages.filter(page => page.pinned);

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
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-xl text-white">Tristan Poland</span>
            </div>

            {/* Desktop Navigation - Only Pinned Pages */}
            <div className="hidden md:flex items-center space-x-8">
              {pinnedPages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {page.name}
                </a>
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
                <a
                  key={page.name}
                  href={page.href}
                  className="block text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {page.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}