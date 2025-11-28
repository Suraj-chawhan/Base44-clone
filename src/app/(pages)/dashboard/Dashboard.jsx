"use client";
import React, { useState } from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

// Import Section Components
import Assessments from "./components/Assessments";
import Templates from "./components/Templates";
import GitHubRepos from "./components/GithubRepos";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("assessments");

  const sections = {
    assessments: <Assessments />,
    templates: <Templates />,
    github: <GitHubRepos />,
    analytics: <Analytics />,
    settings: <Settings />,
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <LeftSidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <RightSidebar selectedSection={selectedSection} content={sections[selectedSection]} />
    </div>
  );
}
