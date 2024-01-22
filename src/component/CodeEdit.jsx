import { Editor } from "@monaco-editor/react";
//https://github.com/suren-atoyan/monaco-react
import { useRef, useState } from "react";
import { BiCollapseAlt } from "react-icons/bi";

export default function CodeEdit({
  language,
  title,
  value,
  onChange,
  renderIcon,
}) {
  const [open, setOpen] = useState(true);
  const editorRef = useRef(null);

  function handleEditorChange(value) {
    onChange(value);
  }

  function handleEditorMount(editor) {
    editorRef.current = editor;
  }
  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <button className="editor-title" onClick={() => setOpen((prev) => !prev)}>
        <span className="flex items-center gap-x-1 title">
          {renderIcon()}
          {title}
        </span>
        <span>{open && <BiCollapseAlt />}</span>
      </button>
      <div className="editor">
        <Editor
          defaultLanguage={language}
          defaultValue={value}
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            inlineSuggest: true,
            fontSize: "14px",
            formatOnType: true,
            autoClosingBrackets: true,
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
