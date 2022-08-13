import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Divider, Grid, Avatar, IconButton } from "@mui/material/";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LexicalComposer from "./lexical/LexicalComposer";
import parse from "html-react-parser";

const useStyles = makeStyles({
  comment_user: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    textAlign: "left",
  },
  comment: {
    textAlign: "left",
    whiteSpace: "pre-wrap",
    marginTop: "20px",
  },
  oldCommentStyle: {
    textAlign: "left",
    whiteSpace: "pre-wrap",
    fontStyle: "italic",
    color: "rgba(149, 165, 166, 0.7)",
  },
});

const Comment = ({ comment, handleUpdateComment, handleDeleteComment }) => {
  const [showForm, setShowForm] = useState(false);

  const classes = useStyles();
  dayjs.extend(relativeTime);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 className={classes.comment_user}>
            <span>{comment.created_by}</span>
            {!showForm && (
              <div>
                <IconButton onClick={() => setShowForm(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteComment(comment.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </h4>
          {!showForm ? (
            <div>
              {comment.updated_json && (
                <div className={classes.oldCommentStyle}>
                  {parse(comment.html_string)}
                </div>
              )}
              <div className={classes.comment}>
                {!comment.updated_html_string
                  ? parse(comment.html_string)
                  : parse(comment.updated_html_string)}
              </div>
            </div>
          ) : (
            <LexicalComposer
              handleSubmitComment={handleUpdateComment}
              mode="edit"
              setShowForm={setShowForm}
              comment={comment}
              composerMode="edit"
            />
          )}
          {!showForm && (
            <p style={{ textAlign: "left", color: "gray" }}>
              {!comment.updated_at ? (
                <>posted {dayjs(comment.created_at).fromNow()}</>
              ) : (
                <>updated {dayjs(comment.updated_at).fromNow()}</>
              )}
            </p>
          )}
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    </div>
  );
};

export default Comment;
