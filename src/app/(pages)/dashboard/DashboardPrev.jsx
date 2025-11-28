"use client"
import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  FileText, 
  Play, 
  Users, 
  BarChart3, 
  Settings,
  Star,
  Search,
  Grid3X3,
  List,
  Plus,
  User,
  Clock,
  Target,
  Zap,
  Github,
  GitBranch,
  Lock,
  Globe,
  Calendar,
  Eye,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('assessments');
  const [searchQuery, setSearchQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gitHubConnected, setGitHubConnected] = useState(false);

  // GitHub API functions
  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("/api/github-app/getRepos", {
        method: "GET",
        headers: {
        
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        setRepositories(data.repos || []);
        setGitHubConnected(true);
      } else {
        throw new Error(data.error || "Failed to fetch repositories");
      }
    } catch (err) {
      console.error("Error fetching repositories:", err);
      setError(err.message);
      setGitHubConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const connectToGitHub = () => {
    // Redirect to GitHub App installation
    const githubAppId = ""; // Replace with your actual GitHub App ID
    window.location.href = `${process.env.NEXT_PUBLIC_GITHUB_APP_CALLBACK_URL}`;
  };

  // Load repositories when GitHub section is selected
  useEffect(() => {
    if (selectedSection === 'github') {
      fetchRepositories();
    }
  }, [selectedSection]);

  const sidebarItems = [
    { id: 'assessments', icon: Brain, label: 'AI Assessments', count: null },
    { id: 'templates', icon: FileText, label: 'Templates', count: null },
    { id: 'github', icon: Github, label: 'GitHub Repos', count: repositories.length || null },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', count: null },
    { id: 'settings', icon: Settings, label: 'Settings', count: null }
  ];

  const assessmentTemplates = [
    {
      id: 1,
      name: 'Software Engineer Technical',
      description: 'Coding challenges, algorithms, system design',
      category: 'Technical',
      difficulty: 'Advanced',
      duration: '90 min',
      questions: 25,
      icon: '💻'
    },
    {
      id: 2,
      name: 'Data Science Assessment',
      description: 'Python, ML, statistics, data analysis',
      category: 'Technical',
      difficulty: 'Intermediate',
      duration: '75 min',
      questions: 20,
      icon: '📊'
    },
    {
      id: 3,
      name: 'Product Manager Evaluation',
      description: 'Strategy, prioritization, stakeholder management',
      category: 'Behavioral',
      difficulty: 'Intermediate',
      duration: '60 min',
      questions: 15,
      icon: '🎯'
    },
    {
      id: 4,
      name: 'Frontend Developer Test',
      description: 'React, JavaScript, CSS, responsive design',
      category: 'Technical',
      difficulty: 'Intermediate',
      duration: '80 min',
      questions: 22,
      icon: '🎨'
    },
    {
      id: 5,
      name: 'Marketing Manager Assessment',
      description: 'Campaign strategy, analytics, customer insights',
      category: 'Behavioral',
      difficulty: 'Beginner',
      duration: '45 min',
      questions: 18,
      icon: '📈'
    },
    {
      id: 6,
      name: 'DevOps Engineer Evaluation',
      description: 'AWS, Docker, CI/CD, infrastructure',
      category: 'Technical',
      difficulty: 'Advanced',
      duration: '100 min',
      questions: 28,
      icon: '⚙️'
    }
  ];

  const myAssessments = [
    {
      id: 1,
      name: 'Senior React Developer - TechCorp',
      template: 'Frontend Developer Test',
      status: 'Active',
      candidates: 12,
      avgScore: 78,
      created: '2 days ago'
    },
    {
      id: 2,
      name: 'ML Engineer Assessment - DataFlow',
      template: 'Data Science Assessment',
      status: 'Draft',
      candidates: 0,
      avgScore: null,
      created: '1 week ago'
    }
  ];

  const SidebarItem = ({ item, isActive, onClick }) => (
    <div
      onClick={onClick}
      className={`flex items-center px-3 py-2 text-sm cursor-pointer rounded-lg mx-2 ${
        isActive 
          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <item.icon className="w-4 h-4 mr-3" />
      <span className="flex-1">{item.label}</span>
      {item.count && (
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {item.count}
        </span>
      )}
    </div>
  );

  const RepositoryCard = ({ repo }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Github className="w-6 h-6 text-gray-600" />
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
              {repo.name}
            </h3>
            <p className="text-sm text-gray-500">{repo.full_name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {repo.private ? (
            <span className="flex items-center px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
              <Lock className="w-3 h-3 mr-1" />
              Private
            </span>
          ) : (
            <span className="flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              <Globe className="w-3 h-3 mr-1" />
              Public
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <GitBranch className="w-3 h-3" />
            <span>main</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>Updated recently</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => window.open(repo.html_url, '_blank')}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center space-x-1"
        >
          <Eye className="w-3 h-3" />
          <span>View on GitHub</span>
        </button>
        <button className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm">
          Clone
        </button>
      </div>
    </div>
  );

  const GitHubConnectionCard = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
      <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect to GitHub</h3>
      <p className="text-gray-600 mb-6">
        Link your GitHub account to display and manage your repositories directly from this dashboard.
      </p>
      <button
        onClick={connectToGitHub}
        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto"
      >
        <Github className="w-5 h-5" />
        <span>Connect GitHub</span>
      </button>
    </div>
  );

  const ErrorCard = ({ error, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-red-900 mb-2">Unable to load repositories</h3>
      <p className="text-red-700 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 mx-auto"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );

  const TemplateCard = ({ template }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{template.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">{template.name}</h3>
            <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
              template.category === 'Technical' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {template.category}
            </span>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          template.difficulty === 'Advanced' 
            ? 'bg-red-100 text-red-800' 
            : template.difficulty === 'Intermediate'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {template.difficulty}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{template.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-3 h-3" />
            <span>{template.questions} questions</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center space-x-1">
          <Zap className="w-3 h-3" />
          <span>Use Template</span>
        </button>
        <button className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm">
          Preview
        </button>
      </div>
    </div>
  );

  const AssessmentCard = ({ assessment }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-gray-900">{assessment.name}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          assessment.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {assessment.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Template: {assessment.template}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Created {assessment.created}</span>
        <div className="flex items-center space-x-4">
          <span>{assessment.candidates} candidates</span>
          {assessment.avgScore && <span>Avg Score: {assessment.avgScore}%</span>}
        </div>
      </div>
    </div>
  );

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">AssessmentAI</span>
          </div>
          <div className="ml-auto flex items-center space-x-1">
            <Star className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">43,133</span>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 py-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={selectedSection === item.id}
                onClick={() => setSelectedSection(item.id)}
              />
            ))}
          </div>
        </div>
        
        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Nikhil Tambre's Organization</p>
              <p className="text-xs text-gray-500 truncate">Default Workspace</p>
            </div>
            <button className="text-blue-600 bg-blue-100 px-3 py-1 rounded text-xs font-medium">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {selectedSection === 'templates' ? 'Assessment Templates' : 
                 selectedSection === 'github' ? 'GitHub Repositories' : 'AI Assessments'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {selectedSection === 'templates' 
                  ? 'Choose from pre-built interview assessment templates'
                  : selectedSection === 'github' 
                  ? 'Manage and view your connected GitHub repositories'
                  : 'AI-powered interview assessment solver and practice platform'
                }
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {selectedSection !== 'github' && (
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${selectedSection}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                  />
                </div>
              )}
              
              {selectedSection === 'github' && gitHubConnected && (
                <>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search repositories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                    />
                  </div>
                  <button
                    onClick={fetchRepositories}
                    disabled={loading}
                    className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </>
              )}
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-800">
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {selectedSection !== 'github' && (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>{selectedSection === 'templates' ? 'Create Template' : 'New Assessment'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {/* GitHub Repositories Section */}
          {selectedSection === 'github' && (
            <div>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                  <span className="ml-3 text-gray-600">Loading repositories...</span>
                </div>
              ) : error ? (
                <ErrorCard error={error} onRetry={fetchRepositories} />
              ) : !gitHubConnected || repositories.length === 0 ? (
                <GitHubConnectionCard />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRepositories.map((repo) => (
                    <RepositoryCard key={repo.id} repo={repo} />
                  ))}
                  {filteredRepositories.length === 0 && searchQuery && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">No repositories found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Templates Section */}
          {selectedSection === 'templates' && (
            <div>
              <div className="mb-6">
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">All Templates</button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Technical</button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Behavioral</button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Custom</button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessmentTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>
          )}
          
          {/* Assessments Section */}
          {selectedSection === 'assessments' && (
            <div className="space-y-4">
              {myAssessments.length > 0 ? (
                myAssessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments created</h3>
                  <p className="text-gray-600 mb-4">Start by choosing a template to create your first AI assessment</p>
                  <button 
                    onClick={() => setSelectedSection('templates')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
                  >
                    Browse Templates
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Other Sections */}
          {!['templates', 'assessments', 'github'].includes(selectedSection) && (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                {React.createElement(
                  sidebarItems.find(item => item.id === selectedSection)?.icon || Settings,
                  { className: "w-6 h-6 text-gray-500" }
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {sidebarItems.find(item => item.id === selectedSection)?.label}
              </h3>
              <p className="text-gray-600">
                Manage your AI assessment platform settings and data.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-3 bg-white">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {selectedSection === 'github' ? (
                `${filteredRepositories.length} repositories`
              ) : selectedSection === 'templates' ? (
                `Items 1 to ${assessmentTemplates.length} of ${assessmentTemplates.length}`
              ) : (
                `Items 1 to ${myAssessments.length} of ${myAssessments.length}`
              )}
            </span>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;