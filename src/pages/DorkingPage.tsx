import { useState, useEffect } from 'react';
import { Search, ExternalLink, Sparkles } from 'lucide-react';

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
];

export default function DorkingPage() {
  const [input, setInput] = useState('');
  const [queries, setQueries] = useState<DorkQuery[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const loadCategoryDorks = async (category: Category) => {
    setLoading(true);
    setSelectedCategory(category);

    try {
      const response = await fetch(`/dorks/${category.file}`);
      if (!response.ok) throw new Error('Failed to load dorks');

      const dorks: DorkQuery[] = await response.json();

      // Replace {input} placeholder with user input if provided
      const processedDorks = dorks.map(dork => ({
        ...dork,
        query: input.trim()
          ? dork.query.replace(/{input}/g, input.trim())
          : dork.query,
      }));

      setQueries(processedDorks);
    } catch (error) {
      console.error('Error loading dorks:', error);
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Google Dorking Assistant</span>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
            Discover Hidden Data
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced Google search queries to find exactly what you're looking for
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-12 animate-slide-up">
          <div className="glass-strong rounded-2xl p-8 shadow-2xl">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="dork-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={selectedCategory?.inputPlaceholder || "Enter website, name, or search term..."}
                  className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* Category Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`group glass hover:glass-strong rounded-xl p-4 text-center transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${
                    selectedCategory?.id === category.id ? 'ring-2 ring-primary bg-primary/10' : ''
                  }`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading && (
          <div className="text-center py-20">
            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dorks...</p>
            </div>
          </div>
        )}

        {!loading && queries.length > 0 && (
          <div className="animate-slide-up">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory?.name} - {queries.length} Dorks
              </h2>
              {input.trim() && (
                <div className="glass px-4 py-2 rounded-lg">
                  <span className="text-sm text-muted-foreground">Target: </span>
                  <span className="text-sm font-medium text-primary">{input}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {queries.map((dork, index) => (
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
