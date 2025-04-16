import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Star, GitFork, Calendar, Code, RefreshCw, ChevronDown, X } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [uniqueTags, setUniqueTags] = useState([]);
  const [uniqueLanguages, setUniqueLanguages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Dropdown state management
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  
  // Refs for dropdown click-outside detection
  const languageDropdownRef = useRef(null);
  const tagDropdownRef = useRef(null);

  // Function to fetch projects from GitHub API
  const fetchGitHubProjects = async (forceRefresh = false) => {
    setIsLoading(true);
    setIsRefreshing(forceRefresh);
    setError(null); // Reset error state on new fetch

    try {
      // Check if we have cached data and it's less than 1 day old
      const cachedData = getCachedData();

      if (cachedData && !forceRefresh) {
        // Use cached data
        processProjectData(cachedData);
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }

      // Fetch fresh data from GitHub API
      const orgs = ['OmniCloudOrg', 'Far-Beyond-Dev', 'Zenyx-Engine', 'PrismaOS', 'The-Open-Com-Foundation', 'Occult-Chat', 'ViaductCI', 'Far-Beyond-Pulsar', 'Grip-Packages', 'Harbr-Foundation']; // Replace with the list of organizations you want to include
      const userReposResponse = await fetch('https://api.github.com/users/tristanpoland/repos?sort=updated&per_page=500');
      const userRepos = await userReposResponse.json();
  
      const orgReposPromises = orgs.map(org =>
        fetch(`https://api.github.com/orgs/${org}/repos?sort=updated&per_page=500`).then(res => res.json())
      );
      const orgRepos = (await Promise.all(orgReposPromises)).flat();
  
      const allRepos = [...userRepos, ...orgRepos];
      const response = { ok: true, json: async () => allRepos };
  
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
  
        const data = await response.json();
  

      // Cache the data
      cacheData(data);

      // Process the data
      processProjectData(data);

    } catch (err) {
      console.error('Failed to fetch GitHub projects:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Process project data to extract needed information
  const processProjectData = (data) => {
    if (!Array.isArray(data)) {
      setError('Invalid data format received from GitHub API');
      return;
    }
    
    // Process the repos to include additional information
    const enhancedProjects = data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description available',
      url: repo.html_url,
      homepage: repo.homepage,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updated: new Date(repo.updated_at),
      created: new Date(repo.created_at),
      topics: repo.topics || [],
      isForked: repo.fork,
      license: repo.license?.name || 'No license'
    }));

    setProjects(enhancedProjects);

    // Extract all unique tags and languages
    const allTags = [];
    const allLanguages = [];

    enhancedProjects.forEach(project => {
      // Add topics (tags)
      project.topics.forEach(topic => {
        if (!allTags.includes(topic)) {
          allTags.push(topic);
        }
      });

      // Add languages
      if (project.language && !allLanguages.includes(project.language)) {
        allLanguages.push(project.language);
      }
    });

    setUniqueTags(allTags.sort());
    setUniqueLanguages(allLanguages.sort());
  };

  // Cache handling functions
  const cacheData = (data) => {
    try {
      const cacheItem = {
        timestamp: new Date().getTime(),
        data: data
      };

      // Use localStorage instead of cookies for better storage
      localStorage.setItem('github_projects', JSON.stringify(cacheItem));
    } catch (err) {
      console.error('Error caching data:', err);
      // Continue without caching
    }
  };

  const getCachedData = () => {
    try {
      const cachedItem = localStorage.getItem('github_projects');
      if (!cachedItem) return null;

      const cacheItem = JSON.parse(cachedItem);
      const cacheTime = new Date(cacheItem.timestamp);
      const now = new Date();

      // Check if cache is less than 1 day old (24 hours)
      const cacheAgeHours = (now - cacheTime) / (1000 * 60 * 60);

      if (cacheAgeHours < 24) {
        return cacheItem.data;
      }

      return null;
    } catch (e) {
      console.error('Error parsing cached data:', e);
      return null;
    }
  };

  // Click outside handler for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false);
      }
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target)) {
        setTagDropdownOpen(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initial data fetch on component mount
  useEffect(() => {
    fetchGitHubProjects();
  }, []);

  // Format date for better readability
  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return 'Invalid date';
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Filter projects based on active filter and filter type
  const getFilteredProjects = () => {
    // Base filter - exclude forked repos by default unless viewing 'forks'
    let filtered = activeFilter === 'forks'
      ? projects.filter(project => project.isForked)
      : projects.filter(project => !project.isForked);

    // Apply additional filters
    if (filterType === 'tag' && activeFilter !== 'all' && activeFilter !== 'forks') {
      filtered = filtered.filter(project =>
        project.topics.includes(activeFilter)
      );
    } else if (filterType === 'language' && activeFilter !== 'all' && activeFilter !== 'forks') {
      filtered = filtered.filter(project =>
        project.language === activeFilter
      );
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  // Generate language badge color
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: 'bg-yellow-600',
      TypeScript: 'bg-blue-600',
      Python: 'bg-blue-950',
      HTML: 'bg-orange-600',
      CSS: 'bg-pink-600',
      Java: 'bg-red-600',
      'C#': 'bg-green-700',
      PHP: 'bg-purple-600',
      Ruby: 'bg-red-700',
      Swift: 'bg-orange-500',
      Go: 'bg-blue-500',
      Rust: 'bg-orange-950',
      Kotlin: 'bg-purple-500',
      Dart: 'bg-blue-400',
    };
    return colors[language] || 'bg-neutral-600';
  };

  // Handle filter selection
  const handleFilterSelect = (filter, type) => {
    setActiveFilter(filter);
    setFilterType(type);
    // Close dropdowns after selection
    setLanguageDropdownOpen(false);
    setTagDropdownOpen(false);
  };

  // Handle force refresh
  const handleForceRefresh = () => {
    fetchGitHubProjects(true);
  };

  // Get cache status for display
  const getCacheStatus = () => {
    try {
      const cached = getCachedData();
      return cached ? 'cached' : 'fetched';
    } catch (e) {
      return 'fetched';
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Projects hero section */}
      <div className="bg-black py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold">Projects</h1>
              <p className="text-xl text-neutral-400 mt-4 max-w-2xl">
                A collection of my work from GitHub, showcasing various technologies and solutions I've built over time.
              </p>
            </div>

            <button
              onClick={handleForceRefresh}
              disabled={isRefreshing || isLoading}
              className={`mt-6 md:mt-0 px-4 py-2 rounded-md flex items-center transition-colors ${
                isRefreshing || isLoading
                  ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              aria-label="Refresh project data"
            >
              <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Compact horizontal filter section */}
      <div className="bg-neutral-950 sticky top-16 z-10 border-b border-neutral-800 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary filters */}
            <div className="flex items-center">
              <span className="text-xs text-neutral-500 font-medium mr-2">View:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleFilterSelect('all', 'all')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeFilter === 'all' && filterType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterSelect('forks', 'all')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeFilter === 'forks'
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  Forks
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-neutral-800"></div>

            {/* Language filter dropdown */}
            {uniqueLanguages.length > 0 && (
              <div className="relative" ref={languageDropdownRef}>
                <button 
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className={`px-3 py-1 text-sm rounded-md flex items-center transition-colors ${
                    filterType === 'language' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                  }`}
                  aria-expanded={languageDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="mr-1">Language</span>
                  {filterType === 'language' && (
                    <span className="ml-1 px-1.5 py-0.5 bg-blue-700 rounded text-xs">
                      {activeFilter}
                    </span>
                  )}
                  <ChevronDown size={14} className={`ml-1 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {languageDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-56 bg-neutral-900 border border-neutral-800 rounded-md shadow-lg overflow-hidden z-20">
                    <div className="max-h-60 overflow-y-auto p-1">
                      <button
                        onClick={() => handleFilterSelect('all', 'all')}
                        className="w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-800 rounded transition-colors"
                      >
                        All Languages
                      </button>
                      {uniqueLanguages.map(language => (
                        <button
                          key={language}
                          onClick={() => handleFilterSelect(language, 'language')}
                          className={`w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-800 rounded flex items-center transition-colors ${
                            activeFilter === language && filterType === 'language' ? 'bg-neutral-800' : ''
                          }`}
                        >
                          <span className={`h-2 w-2 rounded-full ${getLanguageColor(language)} mr-2`}></span>
                          {language}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tags filter dropdown */}
            {uniqueTags.length > 0 && (
              <div className="relative" ref={tagDropdownRef}>
                <button 
                  onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
                  className={`px-3 py-1 text-sm rounded-md flex items-center transition-colors ${
                    filterType === 'tag' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                  }`}
                  aria-expanded={tagDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="mr-1">Tag</span>
                  {filterType === 'tag' && (
                    <span className="ml-1 px-1.5 py-0.5 bg-blue-700 rounded text-xs">
                      {activeFilter}
                    </span>
                  )}
                  <ChevronDown size={14} className={`ml-1 transition-transform ${tagDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {tagDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-56 bg-neutral-900 border border-neutral-800 rounded-md shadow-lg overflow-hidden z-20">
                    <div className="max-h-60 overflow-y-auto p-1">
                      <button
                        onClick={() => handleFilterSelect('all', 'all')}
                        className="w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-800 rounded transition-colors"
                      >
                        All Tags
                      </button>
                      {uniqueTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => handleFilterSelect(tag, 'tag')}
                          className={`w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-800 rounded transition-colors ${
                            activeFilter === tag && filterType === 'tag' ? 'bg-neutral-800' : ''
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Active filter indicator & clear button (only shows when a filter is active) */}
            {((filterType !== 'all' || activeFilter !== 'all') && activeFilter !== 'forks') && (
              <div className="flex items-center ml-auto">
                <span className="text-xs text-neutral-400">
                  Filtered by {filterType}: <span className="text-blue-400">{activeFilter}</span>
                </span>
                <button
                  onClick={() => handleFilterSelect('all', 'all')}
                  className="ml-2 text-neutral-500 hover:text-white transition-colors"
                  aria-label="Clear filter"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Repository count and cache info */}
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-2">
        {!isLoading && !error && (
          <div className="text-xs text-neutral-500 flex justify-between items-center">
            <div>
              {filteredProjects.length} {filteredProjects.length === 1 ? 'repository' : 'repositories'} 
              {activeFilter === 'forks' && (
                <span> (forked)</span>
              )}
            </div>
            {!isRefreshing && !isLoading && (
              <span>
                Data {getCacheStatus()} {formatDate(new Date())}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Projects content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-neutral-400">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-red-400">Error Loading Projects</h3>
            <p className="mt-2 text-white">{error}</p>
            <p className="mt-4 text-neutral-400">Please check your GitHub username or try again later.</p>
            <button
              onClick={handleForceRefresh}
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-neutral-950 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold">No projects found</h3>
            {activeFilter !== 'all' ? (
              <p className="mt-2 text-neutral-400">Try changing the filter or check back later.</p>
            ) : (
              <p className="mt-2 text-neutral-400">No public repositories found on your GitHub account.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800 hover:border-blue-500 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-blue-900/20">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-blue-400 truncate">{project.name}</h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      aria-label={`Open ${project.name} on GitHub`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <p className="text-neutral-300 mb-4 line-clamp-3">{project.description}</p>

                  {project.topics.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.topics.slice(0, 4).map(topic => (
                        <span
                          key={topic}
                          className="text-xs bg-blue-900/40 text-blue-300 px-2 py-1 rounded cursor-pointer hover:bg-blue-800/40 transition-colors"
                          onClick={() => handleFilterSelect(topic, 'tag')}
                        >
                          {topic}
                        </span>
                      ))}
                      {project.topics.length > 4 && (
                        <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded">
                          +{project.topics.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-neutral-900 px-6 py-4 flex flex-wrap items-center justify-between gap-y-2">
                  {project.language && (
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleFilterSelect(project.language, 'language')}
                    >
                      <span className={`h-3 w-3 rounded-full ${getLanguageColor(project.language)} mr-2`}></span>
                      <span className="text-sm text-neutral-300 hover:text-blue-400 transition-colors">{project.language}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-neutral-400" title={`${project.stars} stars`}>
                      <Star size={14} className="mr-1" />
                      <span className="text-xs">{project.stars}</span>
                    </div>
                    <div className="flex items-center text-neutral-400" title={`${project.forks} forks`}>
                      <GitFork size={14} className="mr-1" />
                      <span className="text-xs">{project.forks}</span>
                    </div>
                    <div className="flex items-center text-neutral-400" title={`Updated: ${formatDate(project.updated)}`}>
                      <Calendar size={14} className="mr-1" />
                      <span className="text-xs">{formatDate(project.updated)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}