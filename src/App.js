import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import LexicalComposer from "./components/lexical/LexicalComposer";
import Comment from "./components/Comment";

const useStyles = makeStyles({
  card: {
    marginTop: "50px",
    marginBottom: "25px",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 0 10px 1px lightgrey",
    width: "auto",
  },
});

const App = () => {
  const [comments, setComments] = useState([]);

  const classes = useStyles();

  const handleCreateComment = (json, rawText, htmlString) => {
    const commentData = {
      id: comments.length + 1,
      raw_text: rawText,
      json: json,
      html_string: htmlString,
      created_by: "Richard Hammers",
      created_at: new Date(),
      updated_html_string: "",
    };

    setComments([...comments, commentData]);
  };

  const handleUpdateComment = (json, rawText, htmlString, id) => {
    const comment = comments.find((comment) => comment.id === id);
    comment.updated_json = json;
    comment.updated_raw_text = rawText;
    comment.updated_html_string = htmlString;
    comment.updated_at = new Date();
  };

  const handleDeleteComment = (id) => {
    setComments([...comments.filter((comment) => comment.id !== id)]);
  };

  return (
    <Container>
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Lexical Playground
      </Typography>
      <div className={classes.card}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
        <Typography>Leave a comment</Typography>
        <LexicalComposer handleSubmitComment={handleCreateComment} />
      </div>
    </Container>
  );
};

export default App;
