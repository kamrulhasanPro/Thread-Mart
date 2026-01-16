import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import RichBubbleMenu from "./RichBubbleMenu";
import Placeholder from "@tiptap/extension-placeholder";

const RichTextEditor = ({ value, onChange, condition, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [3, 4],
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: value || null,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div
      className={`w-full border px-4 py-3 rounded-md min-h-[120px]
        transition-all
        ${
          condition
            ? "border-red-400 focus-within:border-red-400"
            : "border-primary/20 focus-within:border-primary"
        }`}
    >
      <EditorContent editor={editor} />
      <RichBubbleMenu editor={editor} />
    </div>
  );
};

export default RichTextEditor;
