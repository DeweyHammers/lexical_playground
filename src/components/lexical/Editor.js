import { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@mui/material";
import { $getRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import $ from "jquery";
import "./styles.css";

const useStyles = makeStyles({
  editorContainer: {
    fontFfamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    border: "#000 1px solid",
    backgroundColor: "rgb(5, 5, 5)",
    margin: "20px auto 20px auto",
    borderRadius: "2px",
    color: "#000",
    position: "relative",
    lineHeight: "20px",
    fontWeight: "400",
    textAlign: "left",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
});

const defaultState = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

const Editor = ({ comment, handleSubmitComment, mode, setShowForm }) => {
  const [editor] = useLexicalComposerContext();

  const classes = useStyles();

  const handleSubmit = () => {
    let rawText = "";
    const htmlString = $("#editor").html();
    const editorState = editor.getEditorState();
    const jsonString = JSON.stringify(editorState).toString();

    editorState.read(() => {
      const root = $getRoot();
      rawText = root.getTextContent();
    });

    if (
      !rawText ||
      htmlString === comment?.html_string ||
      htmlString === comment?.updated_html_string
    )
      return;

    if (mode !== "edit") {
      handleSubmitComment(jsonString, rawText, htmlString);
    } else {
      handleSubmitComment(jsonString, rawText, htmlString, comment?.id);
      setShowForm(false);
    }

    editor.setEditorState(editor.parseEditorState(defaultState));
    editor.focus();
    setTimeout(() => editor.blur(), [100]);
  };

  useEffect(() => {
    comment &&
      editor.setEditorState(
        editor.parseEditorState(comment?.updated_json || comment.json)
      );
  }, [comment, editor]);

  return (
    <>
      <div className={classes.editorContainer}>
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input" id="editor" />
            }
          />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
      <Button onClick={() => handleSubmit()} variant="contained">
        Submit
      </Button>
      {mode === "edit" && (
        <Button
          onClick={() => setShowForm(false)}
          variant="contained"
          color="error"
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      )}
    </>
  );
};

export default Editor;
