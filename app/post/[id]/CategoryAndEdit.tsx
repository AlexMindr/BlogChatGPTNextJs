import React from "react";
import { Editor } from "@tiptap/react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { FormattedPostType } from "@/app/types";

type Props = {
  isEditable: boolean;
  handleIsEditable: (isEditable: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  prevTitle: string;
  setPrevTitle: (prevTitle: string) => void;
  prevContent: string;
  setPrevContent: (prevContent: string) => void;
  editor: Editor | null;
  post: FormattedPostType;
};

const CategoryAndEdit = ({
  isEditable,
  handleIsEditable,
  title,
  setTitle,
  prevTitle,
  setPrevTitle,
  prevContent,
  setPrevContent,
  editor,
  post,
}: Props) => {
  const handleEnableEdit = () => {
    handleIsEditable(!isEditable);
    setPrevTitle(title);
    setPrevContent(editor?.getHTML() || "");
  };

  const handleCancelEdit = () => {
    handleIsEditable(!isEditable);
    setTitle(prevTitle);
    editor?.commands.setContent(prevContent);
  };

  return (
    <div className="flex justify-between items-center">
      <h4 className="bg-accent-orange py-2 px-5 text-wh-900 text-sm font-bold">
        {post.category}
      </h4>
      <div className="mt-4">
        {isEditable ? (
          <div className="flex justify-between gap-3">
            <button onClick={handleCancelEdit}>
              <XMarkIcon className="h-6 w-6 text-accent-red" />
            </button>
          </div>
        ) : (
          <button onClick={handleEnableEdit}>
            <PencilSquareIcon className="h-6 w-6 text-accent-red" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryAndEdit;
