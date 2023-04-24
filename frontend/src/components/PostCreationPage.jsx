import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { Button, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostFormSchema = Yup.object({
  content: Yup.string().required("Обязательное поле"),
});

const PostCreationPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    content: "",
  };

  const redirectToHomePage = () => {
    return navigate("/");
  };

  

  const createPost = async (values, actions) => {
    const { content } = values;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/posts`, {
        content,
        id: nanoid(),
      });
    } catch (err) {
      throw new Error(err);
    }

    actions.resetForm();

    return navigate("/");
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={PostFormSchema}
      onSubmit={createPost}
    >
      <Form className="posts-form">
        <div className="posts-form__header">
          <h4>Публикация</h4>
          <IconButton onClick={redirectToHomePage}>
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
          Опубликовать
        </Button>
      </Form>
    </Formik>
  );
};

export default PostCreationPage;
