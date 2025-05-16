import { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { HandThumbsUp, Chat, HandThumbsUpFill } from "react-bootstrap-icons";
import "./styles.css";
import PostSlider from "../slider/PostSlider";
import { timeAgo } from "../../../../utils/util";
import { Link } from "react-router-dom";

export default function Post({
  userName,
  createdAt,
  isLiked,
  likeCount,
  commentCount,
  communityName,
  content,
  imageUrl,
  userId,
}) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLike = () => {
    setIsLikedState(!isLikedState);
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
            <Link to={`/profile/${userId}`}>
              {" "}
              <img
                src={`https://localhost:7159/${imageUrl}`}
                alt="Profile"
                className="rounded-circle profile-image"
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "cover",
                  transition: "transform 0.2s ease",
                }}
              />
            </Link>
          </div>
          <div className="ms-3">
            <h6 className="mb-0 fw-bold">{userName}</h6>
            <div className="gap-2 d-flex align-items-center">
              <small className="text-muted" style={{ fontSize: "12px" }}>
                {timeAgo(createdAt)}
              </small>

              <small className="text-muted" style={{ fontSize: "12px" }}>
                {communityName}
              </small>
            </div>
          </div>
        </div>

        <div className="py-3 content">
          <p className="px-2 mb-3">{content}</p>
          {imageUrl && (
            <div className="post-image-container">
              <PostSlider>
                <img
                  src={`https://localhost:7159/${imageUrl}`}
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
            variant={isLikedState ? "primary" : "outline-primary"}
            size="sm"
            className="gap-2 d-flex align-items-center interaction-button"
            onClick={handleLike}
          >
            {isLikedState ? <HandThumbsUpFill /> : <HandThumbsUp />}
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="gap-2 d-flex align-items-center interaction-button"
          >
            <Chat /> {commentCount} Comments
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
  profileImage: PropTypes.string,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  isLiked: PropTypes.bool,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  content: PropTypes.string.isRequired,
  communityName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  userId: PropTypes.string,
};

Post.defaultProps = {
  timeAgo: "Just now",
  postImage: "",
  likeCount: 0,
  commentCount: 0,
  isLiked: false,
};
