import { useState } from "react";
import { useSelector } from "react-redux";
import Post from "../components/common/community/post/Post";
import SideBar from "../components/common/community/side-bar/SideBar";
import AddPost from "../components/common/community/add-post/AddPost";
import { useFetchPosts } from "../hooks/useFetchPosts";

const communityOptions = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Books" },
  { id: 3, name: "Music" },
  { id: 4, name: "Movies" },
  { id: 5, name: "Fitness" },
];

export default function Community() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(1); // default
  const { token } = useSelector((state) => state.auth);

  const { posts, loading, error } = useFetchPosts(selectedCommunityId, token);

  return (
    <div className="gap-3 d-flex">
      <SideBar />

      <div className="flex-grow-1 community-content">
        <div className="py-4 container-fluid">
          {/* Select Community Filter */}
          <div className="mb-3">
            <select
              className="w-auto form-select"
              value={selectedCommunityId}
              onChange={(e) => setSelectedCommunityId(Number(e.target.value))}
            >
              {communityOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Post Button */}
          <div
            className="mb-4 post-form-container position-relative"
            style={{ width: "600px" }}
          >
            <button
              type="button"
              className={`btn btn-primary rounded-pill new-post-btn ${
                isOpen ? "active rotate" : ""
              }`}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              New ➕
            </button>
            <div className={`post-form-wrapper ${isOpen ? "show" : ""}`}>
              {isOpen && <AddPost />}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-5 text-center">
              <div className="spinner-border text-primary" role="status" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center alert alert-danger">{error}</div>
          )}

          {/* Posts */}
          <div className="pt-3 mx-auto mx-md-0 posts-container row flex-column">
            {posts.map((post) => (
              <div key={post.id}>
                <Post {...post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
