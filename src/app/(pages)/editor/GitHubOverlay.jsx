"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const images = [
  "/github.png",
  "/github2.png",
];

const githubLink =process.env.NEXT_PUBLIC_GITHUB_APP_CALLBACK_URL;

export default function GitHubOverlay({ onClose }) {
  const [current, setCurrent] = useState(0);
  const [showConnect, setShowConnect] = useState(false);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
      /* if(installationId){
          const repoRes = await fetch(`/api/github-app/getRepos`);
          const repoData = await repoRes.json();
          setRepos(repoData);
        } else {
          
          setShowConnect(true);
        }*/
      } catch (err) {
        console.error(err);
        setShowConnect(true);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const next = () => {
    if (current < images.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-3xl bg-blue-900 rounded-xl shadow-xl p-6 text-white flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded hover:bg-blue-800"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : repos?.length > 0 ? (
          <div className="w-full max-h-[70vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Your GitHub Repos</h2>
            <ul className="space-y-2">
              {repos.map((repo) => (
                <li
                  key={repo.id}
                  className="bg-blue-800 p-3 rounded hover:bg-blue-700 transition"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold"
                  >
                    {repo.name}
                  </a>
                  <p className="text-sm text-gray-300">{repo.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative flex items-center justify-center w-full max-w-2xl max-h-[50vh]">
              <button
                onClick={prev}
                className="absolute left-0 bg-green-500 hover:bg-green-600 p-2 rounded"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <img
                src={images[current]}
                alt={`Slide ${current + 1}`}
                className="max-w-full max-h-[50vh] rounded shadow-lg object-contain"
                onError={(e) => (e.currentTarget.src = "/fallback.png")}
              />

              <button
                onClick={next}
                className="absolute right-0 bg-green-500 hover:bg-green-600 p-2 rounded"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {current === images.length - 1 && (
              <button
                onClick={() => window.open(githubLink, "_blank")}
                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded mt-4"
              >
                Connect to GitHub
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
