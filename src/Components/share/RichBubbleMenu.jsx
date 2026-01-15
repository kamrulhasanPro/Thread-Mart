import { BubbleMenu } from "@tiptap/react/menus";

const MenuButton = ({ active, onClick, children, title }) => {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2 py-1 rounded text-sm font-medium transition
        ${
          active
            ? "bg-primary/50 text-white"
            : "hover:bg-gray-400 text-gray-700"
        }`}
    >
      {children}
    </button>
  );
};

const RichBubbleMenu = ({ editor }) => {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 150 }}
      shouldShow={({ editor }) => !editor.state.selection.empty}
      className="flex gap-1 bg-secondary shadow-lg border border-base-200 rounded-md p-1 z-[99999]"
    >
      {/* Bold */}
      <MenuButton
        title={"Bold (Ctrl + B)"}
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </MenuButton>

      {/* Italic */}
      <MenuButton
        title={"Italic (Ctrl + I)"}
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </MenuButton>

      {/* H3 */}
      <MenuButton
        title={"Heading 3 (### + Space)"}
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </MenuButton>

      {/* H4 */}
      <MenuButton
        title={"Heading 3 (#### + Space)"}
        active={editor.isActive("heading", { level: 4 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        H4
      </MenuButton>

      {/* Bullet List */}
      <MenuButton
        title={"Bullet list (- + Space)"}
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • List
      </MenuButton>

      {/* Numbered List */}
      <MenuButton
        title={"Numbered list (1. + Space)"}
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. List
      </MenuButton>
    </BubbleMenu>
  );
};

export default RichBubbleMenu;
