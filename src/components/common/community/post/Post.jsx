import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { HandThumbsUp, Chat } from "react-bootstrap-icons";
import "./styles.css";
export default function Post({
  profileImage,
  username,
  timeAgo,
  content,
  postImage,
}) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // دالة لزيادة عدد الإعجابات
  const handleLike = () => setLikes(likes + 1);

  // دالة لإضافة تعليق جديد
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      setComments([...comments, commentText]);
      setCommentText(""); // تفريغ الحقل بعد الإرسال
    }
  };

  return (
    <Card
      className="px-2 pt-3 mx-5 my-3 shadow-sm post rounded-4"
      style={{ width: "600px" }}
    >
      <Card.Body>
        <div className="info d-flex align-items-center">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="ms-2">
            <h6 className="mb-0">{username}</h6>
            <small className="text-muted" style={{ fontSize: "10px" }}>
              {timeAgo}
            </small>
          </div>
        </div>

        <div className="py-3 content">
          <p className="px-2">{content}</p>
          {postImage && (
            <img
              src={postImage}
              alt="Post"
              className="img-fluid w-100 rounded-4"
            />
          )}
        </div>

        <div className="mt-2 d-flex align-items-center">
          <Button
            variant="outline-primary"
            size="sm"
            className="me-2"
            onClick={handleLike}
          >
            <HandThumbsUp /> {likes} Like
          </Button>
          <Button variant="outline-secondary" size="sm">
            <Chat /> Comment
          </Button>
        </div>

        <div className="mt-3">
          <Form onSubmit={handleCommentSubmit}>
            <Form.Control
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button variant="primary" size="sm" type="submit" className="mt-2">
              Post
            </Button>
          </Form>

          {/* عرض التعليقات */}
          {comments.length > 0 && (
            <div className="mt-3">
              <h6>Comments:</h6>
              <ul className="list-unstyled">
                {comments.map((comment, index) => (
                  <li key={index} className="py-1 border-bottom">
                    {comment}
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
