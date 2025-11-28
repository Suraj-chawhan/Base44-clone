import React from "react";
import { Clock, Target, Zap } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Base44 Technical Assessment",
    description: "Front-end React and JS technical challenges.",
    category: "Technical",
    difficulty: "Advanced",
    duration: "90 min",
    questions: 20,
    icon: "💻",
  },
  {
    id: 2,
    name: "Behavioral Interview",
    description: "Behavioral questions for soft skills evaluation.",
    category: "Behavioral",
    difficulty: "Intermediate",
    duration: "45 min",
    questions: 10,
    icon: "🗣️",
  },
];

export default function Templates() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">{template.icon}</span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                template.difficulty === "Advanced"
                  ? "bg-red-100 text-red-800"
                  : template.difficulty === "Intermediate"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {template.difficulty}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
            {template.name}
          </h3>
          <p className="text-sm text-gray-500 mb-4">{template.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center space-x-3">
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
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Use Template</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm">
              Preview
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
