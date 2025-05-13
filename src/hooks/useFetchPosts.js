import { useEffect, useState } from "react";

export function useFetchPosts(communityId, token) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!communityId) return;

    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://localhost:7159/api/Community/${communityId}/posts`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [communityId, token]);

  return { posts, loading, error };
}
