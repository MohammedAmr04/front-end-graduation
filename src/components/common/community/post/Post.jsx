import { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { HandThumbsUp, Chat, HandThumbsUpFill } from "react-bootstrap-icons";
import "./styles.css";
import PostSlider from "../slider/PostSlider";

export default function Post({
  profileImage,
  username,
  timeAgo,
  content,
  postImage,
}) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      setComments([...comments, { text: commentText, timestamp: new Date() }]);
      setCommentText("");
    }
  };

  return (
    <Card
      className={`post-card ${
        isVisible ? "fade-in" : ""
      } mx-auto my-3 shadow-sm rounded-4`}
      style={{
        width: "100%",
        maxWidth: "600px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Card.Body className="p-3 p-md-4">
        <div className="info d-flex align-items-center">
          <div className="profile-image-container">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-circle profile-image"
              style={{
                width: "45px",
                height: "45px",
                objectFit: "cover",
                transition: "transform 0.2s ease",
              }}
            />
          </div>
          <div className="ms-3">
            <h6 className="mb-0 fw-bold">{username}</h6>
            <small className="text-muted" style={{ fontSize: "12px" }}>
              {timeAgo}
            </small>
          </div>
        </div>

        <div className="py-3 content">
          <p className="px-2 mb-3">{content}</p>
          {postImage && (
            <div className="post-image-container">
              <PostSlider>
                <img
                  src={postImage}
                  alt="Post"
                  className="img-fluid w-100 rounded-4"
                  style={{ objectFit: "cover" }}
                />
              </PostSlider>
            </div>
          )}
        </div>

        <div className="gap-2 mt-2 interaction-buttons d-flex align-items-center">
          <Button
            variant={isLiked ? "primary" : "outline-primary"}
            size="sm"
            className="gap-2 d-flex align-items-center interaction-button"
            onClick={handleLike}
          >
            {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />}
            <span>{likes}</span>
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="gap-2 d-flex align-items-center interaction-button"
          >
            <Chat /> Comment
          </Button>
        </div>

        <div className="mt-3 comments-section">
          <Form onSubmit={handleCommentSubmit} className="comment-form">
            <Form.Control
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="rounded-pill"
            />
            <Button
              variant="primary"
              size="sm"
              type="submit"
              className="px-3 mt-2 rounded-pill"
              disabled={!commentText.trim()}
            >
              Post
            </Button>
          </Form>

          {comments.length > 0 && (
            <div className="mt-3 comments-list">
              <h6 className="mb-3">Comments</h6>
              <ul className="list-unstyled">
                {comments.map((comment, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 mb-2 comment-item bg-light rounded-3"
                    style={{
                      animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s`,
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="comment-text">{comment.text}</div>
                      <small className="text-muted">
                        {new Date(comment.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

Post.propTypes = {
  profileImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  timeAgo: PropTypes.string,
  content: PropTypes.string.isRequired,
  postImage: PropTypes.string,
};

Post.defaultProps = {
  timeAgo: "Just now",
  postImage: "",
};
