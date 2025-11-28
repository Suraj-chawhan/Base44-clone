import React, { useState } from "react";
import { Github, Lock, Globe, GitBranch, Calendar, Eye, RefreshCw } from "lucide-react";

const dummyRepos = [
  {
    id: 1,
    name: "AI-Assessment",
    full_name: "NikhilTambre/AI-Assessment",
    private: false,
    branch: "main",
    updated: "2 days ago",
    html_url: "#",
  },
  {
    id: 2,
    name: "React-Templates",
    full_name: "NikhilTambre/React-Templates",
    private: true,
    branch: "dev",
    updated: "1 week ago",
    html_url: "#",
  },
];

export default function GitHubRepos() {
  const [repositories, setRepositories] = useState(dummyRepos);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo) => (
        <div
          key={repo.id}
          className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Github className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">{repo.name}</h3>
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
                <span>{repo.branch}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{repo.updated}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.open(repo.html_url, "_blank")}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center space-x-1"
            >
              <Eye className="w-3 h-3" />
              <span>View</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm">
              Clone
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
