import { useState, useEffect } from 'react';
import { Search, ExternalLink, Sparkles, Filter, Plus, X } from 'lucide-react';

interface DorkQuery {
  label: string;
  query: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  file: string;
  icon: string;
  inputPlaceholder: string;
  requiresInput: boolean;
}

const categories: Category[] = [
  {
    id: 'people-username',
    name: 'People & Username',
    file: 'people-username.json',
    icon: '👤',
    inputPlaceholder: 'Enter name or username...',
    requiresInput: true,
  },
  {
    id: 'social-media',
    name: 'Social Media',
    file: 'social-media.json',
    icon: '📱',
    inputPlaceholder: 'Enter name or username...',
    requiresInput: true,
  },
  {
    id: 'websites',
    name: 'Websites',
    file: 'websites.json',
    icon: '🌐',
    inputPlaceholder: 'Enter website (e.g., example.com)...',
    requiresInput: true,
  },
  {
    id: 'admin-portals',
    name: 'Admin Portals',
    file: 'admin-portals.json',
    icon: '🔐',
    inputPlaceholder: 'Enter website (e.g., example.com)...',
    requiresInput: true,
  },
  {
    id: 'files',
    name: 'Files',
    file: 'files.json',
    icon: '📁',
    inputPlaceholder: 'Enter website (e.g., example.com)...',
    requiresInput: true,
  },
  {
    id: 'sensitive-info',
    name: 'Sensitive Info',
    file: 'sensitive-info.json',
    icon: '⚠️',
    inputPlaceholder: 'Enter website (e.g., example.com)...',
    requiresInput: true,
  },
  {
    id: 'vulnerabilities',
    name: 'Vulnerabilities',
    file: 'vulnerabilities.json',
    icon: '🛡️',
    inputPlaceholder: 'Enter website (e.g., example.com)...',
    requiresInput: true,
  },
  {
    id: 'company-research',
    name: 'Company Research',
    file: 'company-research.json',
    icon: '🏢',
    inputPlaceholder: 'Enter company name...',
    requiresInput: true,
  },
  {
    id: 'iot-devices',
    name: 'IoT & Smart Devices',
    file: 'iot-devices.json',
    icon: '📡',
    inputPlaceholder: 'Enter website (e.g., example.com)...',
    requiresInput: true,
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    file: 'cloud-storage.json',
    icon: '☁️',
    inputPlaceholder: 'Enter company name or keyword...',
    requiresInput: true,
  },
  {
    id: 'code-repositories',
    name: 'Code Repositories',
    file: 'code-repositories.json',
    icon: '💻',
    inputPlaceholder: 'Enter username or repo name...',
    requiresInput: true,
  },
];

export default function DorkingPage() {
  const [input, setInput] = useState('');
  const [queries, setQueries] = useState<DorkQuery[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [showDorkBuilder, setShowDorkBuilder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Custom Dork Builder state
  const [customDorkSite, setCustomDorkSite] = useState('');
  const [customDorkInurl, setCustomDorkInurl] = useState('');
  const [customDorkIntext, setCustomDorkIntext] = useState('');
  const [customDorkFiletype, setCustomDorkFiletype] = useState('');
  const [customDorkIntitle, setCustomDorkIntitle] = useState('');

  const loadCategoryDorks = async (category: Category) => {
    setLoading(true);
    setSelectedCategory(category);
    setError(null);

    try {
      const response = await fetch(`/dorks/${category.file}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${category.name} dorks (${response.status})`);
      }

      const dorks: DorkQuery[] = await response.json();

      if (!Array.isArray(dorks) || dorks.length === 0) {
        throw new Error('No dorks found in this category');
      }

      // Replace {input} placeholder with user input if provided
      const processedDorks = dorks.map(dork => ({
        ...dork,
        query: input.trim()
          ? dork.query.replace(/{input}/g, input.trim())
          : dork.query,
      }));

      setQueries(processedDorks);
      setError(null);
    } catch (error) {
      console.error('Error loading dorks:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load dorks. Please try again.';
      setError(errorMessage);
      setQueries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: Category) => {
    if (category.requiresInput && !input.trim()) {
      // Focus on input if category requires input
      document.getElementById('dork-input')?.focus();
      return;
    }
    loadCategoryDorks(category);
  };

  const handleSearch = (query: string) => {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleUrl, '_blank');
  };

  // Custom Dork Builder function
  const buildCustomDork = () => {
    let dork = '';
    if (customDorkSite) dork += `site:${customDorkSite} `;
    if (customDorkInurl) dork += `inurl:${customDorkInurl} `;
    if (customDorkIntext) dork += `intext:"${customDorkIntext}" `;
    if (customDorkIntitle) dork += `intitle:"${customDorkIntitle}" `;
    if (customDorkFiletype) dork += `filetype:${customDorkFiletype} `;
    return dork.trim();
  };

  const executeCustomDork = () => {
    const customQuery = buildCustomDork();
    if (customQuery) {
      handleSearch(customQuery);
    }
  };

  // Filter dorks based on search input
  const filteredQueries = queries.filter(dork =>
    dork.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
    dork.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
    dork.query.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Auto-load category dorks when input changes and category is selected
  useEffect(() => {
    if (selectedCategory && input.trim()) {
      loadCategoryDorks(selectedCategory);
    }
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#12121E] to-[#1A1A2E] relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <a
            href="https://github.com/zebbern"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4 group"
          >
            <div className="relative w-20 h-20 mx-auto">
              <img
                src="/zeb.png"
                alt="GitHub Profile"
                className="w-full h-full rounded-full object-cover glass-strong ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all group-hover:scale-105 shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </a>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Google Dorking Assistant</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced Google search queries to find exactly what you're looking for
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8 animate-slide-up">
          <div className="glass-strong rounded-xl p-6 shadow-2xl">
            <div className="flex gap-4 mb-5">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="dork-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={selectedCategory?.inputPlaceholder || "Enter website, name, or search term..."}
                  className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* Category Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`group glass hover:glass-strong rounded-lg p-2 text-center transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${
                    selectedCategory?.id === category.id ? 'ring-2 ring-primary bg-primary/10' : ''
                  }`}
                >
                  <div className="text-xl mb-1">{category.icon}</div>
                  <div className="text-[10px] font-medium text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Dork Builder Toggle */}
            <div className="mt-4">
              <button
                onClick={() => setShowDorkBuilder(!showDorkBuilder)}
                className="glass hover:glass-strong rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all flex items-center gap-2 w-full justify-center"
              >
                <Plus className="w-4 h-4" />
                {showDorkBuilder ? 'Hide Custom Dork Builder' : 'Show Custom Dork Builder'}
              </button>
            </div>

            {/* Custom Dork Builder */}
            {showDorkBuilder && (
              <div className="mt-4 glass-strong rounded-lg p-4 space-y-3 animate-slide-up">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">Custom Dork Builder</h3>
                  <button onClick={() => setShowDorkBuilder(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={customDorkSite}
                    onChange={(e) => setCustomDorkSite(e.target.value)}
                    placeholder="site: example.com"
                    className="bg-background/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    value={customDorkInurl}
                    onChange={(e) => setCustomDorkInurl(e.target.value)}
                    placeholder="inurl: admin"
                    className="bg-background/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    value={customDorkIntext}
                    onChange={(e) => setCustomDorkIntext(e.target.value)}
                    placeholder="intext: password"
                    className="bg-background/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    value={customDorkIntitle}
                    onChange={(e) => setCustomDorkIntitle(e.target.value)}
                    placeholder="intitle: index of"
                    className="bg-background/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    value={customDorkFiletype}
                    onChange={(e) => setCustomDorkFiletype(e.target.value)}
                    placeholder="filetype: pdf"
                    className="bg-background/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 bg-background/50 rounded-lg px-3 py-2 text-sm text-primary font-mono overflow-x-auto">
                    {buildCustomDork() || 'Build your custom dork...'}
                  </div>
                  <button
                    onClick={executeCustomDork}
                    disabled={!buildCustomDork()}
                    className="glass hover:glass-strong rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="animate-fade-in mb-8">
            <div className="glass-strong rounded-2xl p-8 max-w-2xl mx-auto border border-red-500/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-500 mb-2">Error Loading Dorks</h3>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <button
                    onClick={() => selectedCategory && loadCategoryDorks(selectedCategory)}
                    className="glass hover:glass-strong rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {loading && (
          <div className="text-center py-20">
            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading {selectedCategory?.name} dorks...</p>
              <p className="text-sm text-muted-foreground/70 mt-2">This will only take a moment</p>
            </div>
          </div>
        )}

        {!loading && queries.length > 0 && (
          <div className="animate-slide-up">
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedCategory?.name} - {filteredQueries.length} / {queries.length} Dorks
                </h2>
                {input.trim() && (
                  <div className="glass px-4 py-2 rounded-lg">
                    <span className="text-sm text-muted-foreground">Target: </span>
                    <span className="text-sm font-medium text-primary">{input}</span>
                  </div>
                )}
              </div>

              {/* Filter Search */}
              <div className="glass rounded-lg p-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Filter dorks by keyword (label, description, or query)..."
                    className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  {searchFilter && (
                    <button
                      onClick={() => setSearchFilter('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredQueries.map((dork, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(dork.query)}
                  className="group glass hover:glass-strong rounded-xl p-6 text-left transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {dork.label}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{dork.description}</p>
                      <code className="text-xs bg-background/50 px-3 py-1.5 rounded-md text-primary/80 block overflow-x-auto">
                        {dork.query}
                      </code>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && queries.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">
                Select a category to generate Google Dork queries
              </p>
              <p className="text-sm text-muted-foreground/70">
                Enter your search term above and click a category
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
