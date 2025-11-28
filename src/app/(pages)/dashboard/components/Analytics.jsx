import React from "react";
import { BarChart3, Users, Target } from "lucide-react";

const metrics = [
  { id: 1, title: "Active Users", value: "1,234", icon: Users },
  { id: 2, title: "Assessments Completed", value: "567", icon: BarChart3 },
  { id: 3, title: "Average Score", value: "78%", icon: Target },
];

export default function Analytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-white p-5 rounded-lg shadow hover:shadow-lg flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <metric.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{metric.value}</h3>
            <p className="text-sm text-gray-500">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
