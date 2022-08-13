import Editor from "./Editor";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import ExampleTheme from "./themes/ExampleTheme";

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const Composer = ({
  handleSubmitComment,
  mode,
  setShowForm,
  comment,
  setEditor,
}) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Editor
        setEditor={setEditor}
        comment={comment}
        handleSubmitComment={handleSubmitComment}
        setShowForm={setShowForm}
        mode={mode}
      />
    </LexicalComposer>
  );
};

export default Composer;
