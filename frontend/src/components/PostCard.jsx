import PropTypes from "prop-types";
import { Avatar, Card, CardContent, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, children }) => {
  const { id, content, created } = post;

  const navigate = useNavigate();

  const createdDate = String(new Date(created))
    .split(" ")
    .slice(0, 5)
    .join(" ");

  const goToPostPage = () => {
    return navigate(`/posts/${id}`);
  };

  return (
    <Card className="post-card">
      <CardContent>
        <div className="post__header">
          <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" />
          <div className="post__user-info">
            <span>Иван Иванов</span>
            <div>
              <span>Основатель группы - {createdDate}</span>
            </div>
          </div>
        </div>

        <h4>{content}</h4>
      </CardContent>
      {!children ? (
        <CardActions className="post__actions">
          <Button onClick={goToPostPage} variant="contained">
            Подробнее
          </Button>
        </CardActions>
      ) : (
        <CardActions className="post__actions">{children}</CardActions>
      )}
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
  }).isRequired,
};

export default PostCard;
