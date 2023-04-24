import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Button, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";
import axios from "axios";
import { PostsContext } from "../App";
import { useContext } from "react";

const PostFormSchema = Yup.object({
  content: Yup.string().required("Обязательное поле"),
});

const PostEditCard = ({ post, onCloseEditCard }) => {
  const { id, content } = post;
  const { getPosts } = useContext(PostsContext);

  const initialValues = {
    content,
  };

  const closeEditCard = () => {
    onCloseEditCard();
  };

  const editPost = async (values, actions) => {
    const { content } = values;

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/posts`, {
        content,
        id,
      });
    } catch (err) {
      throw new Error(err);
    }

    actions.resetForm();
    getPosts();
    onCloseEditCard();
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={PostFormSchema}
      onSubmit={editPost}
    >
      <Form className="posts-form">
        <div className="posts-form__header">
          <h4>Редактировать публикацию</h4>
          <IconButton onClick={closeEditCard}>
            <Clear />
          </IconButton>
        </div>
        <div className="form-group">
          <Field className="form-field" component="textarea" name="content" />
          <p className="error-text">
            <ErrorMessage name="content" />
          </p>
        </div>
        <Button
          className="posts-form__submit-btn"
          variant="contained"
          type="submit"
        >
          Сохранить
        </Button>
      </Form>
    </Formik>
  );
};

PostEditCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
  }).isRequired,
  onCloseEditCard: PropTypes.func.isRequired,
};
export default PostEditCard;
