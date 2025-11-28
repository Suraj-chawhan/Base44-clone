"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GitHubCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const installation_id = searchParams.get("installation_id");
  const [status, setStatus] = useState("Linking GitHub...");

  useEffect(() => {
    async function linkInstallation() {
      try {
        const token = localStorage.getItem("jwt");
        if (!installation_id) {
          setStatus("❌ Missing installation_id.");
          return;
        }
        if (!token) {
          setStatus("❌ No login found.");
          return;
        }

        const resp = await fetch("/api/ai/link-install", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ installationId: installation_id }),
        });

        const data = await resp.json();
        if (resp.ok) {
          setStatus(data.message || "✅ Linked!");
          setTimeout(() => router.push("/"), 1500);
        } else {
          setStatus("❌ " + (data.error || "Failed"));
        }
      } catch (e) {
        console.error(e);
        setStatus("❌ Error linking installation.");
      }
    }

    linkInstallation();
  }, [installation_id, router]);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Linking GitHub...</h2>
      <p id="status">{status}</p>
    </div>
  );
}
